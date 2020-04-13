export const sortCompaniesDescending = state => {
  return state.companies.sort((companyOne, companyTwo) => {
    return companyTwo.totalIncome - companyOne.totalIncome;
  });
};
export const filteredCompanies = (state, getters) => {
  if (!state.searchCompany) {
    return getters.sortCompaniesDescending;
  } else {
    return getters.sortCompaniesDescending.filter(company => {
      return company.name
        .toLowerCase()
        .includes(state.searchCompany.toLowerCase());
    });
  }
};
