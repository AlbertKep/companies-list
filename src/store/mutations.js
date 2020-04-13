export const getCompanies = (state, payload) => {
  state.companies = payload.mergeCompaniesAndIncomes;
  state.allCompanies = payload.incomes;
  state.isLoading = payload.isLoading;
  state.isFetched = payload.isFetched;
};
export const searchCompany = (state, payload) => {
  state.searchCompany = payload;
};
export const getCompany = (state, payload) => {
  state.company = payload;
};
