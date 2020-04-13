<template>
  <div class="company__chart">
    <!-- <h1>Company Chart</h1> -->
    <canvas id="company-chart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import companyChart from "../../ChartData";
export default {
  props: ["company"],
  data() {
    return {
      companyMonthlyIncomes: {},
      companyChart
    };
  },
  computed: {},
  methods: {
    getDateAndValue() {
      this.company.forEach(element => {
        let currentMonth = new Date(element.date).getMonth();
        let currentYear = new Date(element.date).getFullYear();
        let fullDate = `${currentMonth + 1}/${currentYear}`;
        let currentValue = parseInt(element.value);

        this.getDate(fullDate);
        this.getMonthlyIncomes(fullDate, currentValue);
      });
    },
    getDate(date) {
      if (this.companyMonthlyIncomes[date] !== undefined) {
        return;
      } else {
        this.companyMonthlyIncomes[date] = 0;
      }
    },
    getMonthlyIncomes(date, value) {
      this.companyMonthlyIncomes[date] += value;
    },
    updateChart(companyData) {
      companyChart.data.labels = Object.keys(companyData);
      companyChart.data.datasets.forEach(dataset => {
        dataset.data = Object.values(companyData);
      });
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
      return myChart;
    }
  },
  mounted() {
    this.getDateAndValue();
    this.updateChart(this.companyMonthlyIncomes);
    this.createChart("company-chart", this.companyChart);
  }
};
</script>
<style lang="scss" scoped>
.company__chart {
  width: 100vw;
  height: 45vh;
}
@media only screen and (min-width: 768px) {
  .company__chart {
    margin: 2em;
    width: 60vw;
  }
}
</style>
