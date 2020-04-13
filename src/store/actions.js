import axios from "axios";

export const getCompanies = ({ commit }) => {
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
          axios.get(`https://recruitment.hal.skygate.io/incomes/${company.id}`)
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
};

export const searchCompany = ({ commit }, payload) => {
  commit("searchCompany", payload);
};

export const getCompany = ({ commit }, payload) => {
  commit("getCompany", payload);
};
