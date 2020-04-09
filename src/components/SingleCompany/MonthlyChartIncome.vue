<template>
  <div class="company__chart">
    <h1>Company Chart</h1>
    <!-- Data Comany: {{ showIncomes }} -->
  </div>
</template>
<script>
export default {
  props: ["company"],
  data() {
    return {
      companyIncomes: null,
      companyDates: null,
      companyMonthlyIncome: []
    };
  },
  computed: {
    // showIncomes() {
    //   this.company.forEach(income => {
    //     this.companyDates += new Date(income.date);
    //   });
    //   return this.companyDates;
    // }
  },
  methods: {
    getCompany() {
      // console.log(this.company);
    }
  },
  mounted() {
    this.getCompany();
  }
};
</script>
