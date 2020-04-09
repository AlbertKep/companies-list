import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import axios from "axios";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  reducer: state => ({
    keepCompany: state.company
  })
});
export const store = new Vuex.Store({
  state: {
    companies: [],
    incomes: [],
    filteredCompanies: [],
    searchCompany: "",
    company: [],
    isLoading: true,
    isFetched: false
  },
  mutations: {
    getCompanies(state, payload) {
      state.companies = payload.mergeCompaniesAndIncomes;
      state.allCompanies = payload.incomes;
      state.isLoading = payload.isLoading;
      state.isFetched = payload.isFetched;
    },
    searchCompany(state, payload) {
      state.searchCompany = payload;
    },
    getCompany(state, payload) {
      state.company = payload;
    }
  },
  actions: {
    getCompanies({ commit }) {
      let companies = [];
      let requests = [];
      let incomes = [];
      let isLoading = true;
      let isFetched = false;

      axios
        .get("https://recruitment.hal.skygate.io/companies")
        .then(response => {
          response.data.forEach(company => {
            companies.push({
              id: company.id,
              name: company.name,
              city: company.city,
              incomes: []
            });
            requests.push(
              axios.get(
                `https://recruitment.hal.skygate.io/incomes/${company.id}`
              )
            );
          });

          return axios.all(requests);
        })
        .then(responses => {
          isLoading = false;
          isFetched = true;
          responses.forEach(response => {
            incomes.push(response.data);
          });
          incomes.forEach(el => {
            el.totalIncome = 0;
            el.averageIncome = 0;
            el.incomes.map(income => {
              el.totalIncome += parseInt(income.value);
              el.averageIncome += parseInt(income.value) / incomes.length;
            });
          });

          let mergeCompaniesAndIncomes = [];

          for (let i = 0; i < companies.length; i++) {
            mergeCompaniesAndIncomes.push({
              ...companies[i],
              ...incomes.find(income => income.id === companies[i].id)
            });
          }

          commit("getCompanies", {
            mergeCompaniesAndIncomes,
            incomes,
            isLoading,
            isFetched
          });
        });
    },
    searchCompany({ commit }, payload) {
      commit("searchCompany", payload);
    },
    getCompany({ commit }, payload) {
      commit("getCompany", payload);
    }
  },
  plugins: [vuexLocalStorage.plugin],
  getters: {
    sortCompaniesDescending(state) {
      return state.companies.sort((companyOne, companyTwo) => {
        return companyTwo.totalIncome - companyOne.totalIncome;
      });
    },
    filteredCompanies: (state, getters) => {
      if (!state.searchCompany) {
        return getters.sortCompaniesDescending;
      } else {
        return getters.sortCompaniesDescending.filter(company => {
          return company.name
            .toLowerCase()
            .includes(state.searchCompany.toLowerCase());
        });
      }
    }
  }
});
