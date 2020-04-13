import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";

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
  mutations,
  actions,
  plugins: [vuexLocalStorage.plugin],
  getters
});
