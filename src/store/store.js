import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    companies: [],
    incomes: [],
    allCompanies: []
  },
  mutations: {
    getCompanies(state, payload) {
      state.companies = payload.mergeCompaniesAndIncomes;
      state.allCompanies = payload.incomes;
    }
  },
  actions: {
    getCompanies({ commit }) {
      let companies = [];
      let requests = [];
      let incomes = [];

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
          responses.forEach(response => {
            incomes.push(response.data);
          });
          incomes.forEach(el => {
            el.totalIncome = 0;
            el.incomes.map(income => {
              el.totalIncome += parseInt(income.value);
            });
          });

          let mergeCompaniesAndIncomes = [];

          for (let i = 0; i < companies.length; i++) {
            mergeCompaniesAndIncomes.push({
              ...companies[i],
              ...incomes.find(income => income.id === companies[i].id)
            });
          }

          commit("getCompanies", { mergeCompaniesAndIncomes, incomes });
        });
    }
  },
  getters: {
    sortCompaniesDescending(state) {
      return state.companies.sort((a, b) => {
        return b.totalIncome - a.totalIncome;
      });
    }
  }
});
