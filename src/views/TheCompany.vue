<template>
  <div class="company">
    <h1 class="company__name">{{ company.name }}</h1>
    <company-details :company="company"></company-details>
    <company-chart :company="company.incomes"></company-chart>
  </div>
</template>

<script>
import CompanyDetails from "../components/SingleCompany/CompanyDetails";
import Chart from "../components/SingleCompany/MonthlyChartIncome";

export default {
  data() {
    return {
      companyShow: false,
      company: {}
    };
  },
  components: {
    "company-details": CompanyDetails,
    "company-chart": Chart
  },
  watch: {
    $route: ["fetchData"]
  },
  methods: {
    fetchData() {
      this.$store.getters.filteredCompanies.forEach(company => {
        if (company.id == this.$route.params.id) {
          this.company = company;
          this.$store.dispatch("getCompany", this.company);
        }
      });
      this.sortIncomesDates();
    },
    getCompanyFromLocalStorage() {
      this.company = JSON.parse(localStorage.getItem("vuex")).keepCompany;
    },
    sortIncomesDates() {
      this.company.incomes.sort((dateOne, dateTwo) => {
        return Date.parse(dateOne.date) - Date.parse(dateTwo.date);
      });
    }
  },
  created() {
    if (this.$store) {
      this.getCompanyFromLocalStorage();
    }
    this.fetchData();
  }
};
</script>
<style lang="scss" scoped>
.company {
  height: 100vh;
  background: #4e4cb8;
  &__name {
    padding: 2em 1em;
  }
}

@media only screen and (min-width: 768px) {
  .company {
    display: grid;
    grid-template-areas: repeat(2, 1fr);
    grid-template-rows: 30% 70%;
    grid-template-areas:
      "name name"
      "details chart";
    &__name {
      grid-area: name;
      text-align: left;
    }
    &__chart {
      grid-area: chart;
    }
  }
}
</style>
