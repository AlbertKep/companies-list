<template>
  <div class="company">
    <h1 class="company__name">{{ company.name }}</h1>
    <div class="company__details">
      <p>
        <span class="company__properties">id:</span>
        <span class="company__value">{{ company.id }}</span>
      </p>
      <p>
        <span class="company__properties">city:</span>
        <span class="company__value">{{ company.city }}</span>
      </p>
      <p>
        <span class="company__properties">total income:</span>
        <span class="company__value">{{ totalIncome }}</span>
      </p>
      <p>
        <span class="company__properties">average income:</span>
        <span class="company__value">{{ averageIncome }}</span>
      </p>
      <div class="company__date-picker">
        <label for="dates">Select Date Range:</label>
        <v-date-picker
          v-model="dates"
          :value="dates"
          is-dark
          mode="range"
          color="purple"
          :masks="{ input: 'DD/MM/YY' }"
          :placeholder="dates"
          class="company__date-picker"
        ></v-date-picker>
      </div>
    </div>
    <div class="company__chart">
      <h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quo in
        laudantium repellendus delectus recusandae impedit explicabo quidem, eos
      </h1>
    </div>
  </div>
</template>

<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd";

export default {
  data() {
    return {
      company: {},
      dates: {
        start: new Date(),
        end: new Date()
      },
      selectedRange: [],
      limitedTotalIncome: 0
    };
  },
  components: {
    "v-date-picker": DatePicker
  },
  computed: {
    totalIncome() {
      if (this.selectedRange.length === 0) {
        return this.company.totalIncome;
      } else {
        this.selectedRange.map(income => {
          this.limitedTotalIncome += parseInt(income.value);
        });
        return this.limitedTotalIncome;
      }
    },
    averageIncome() {
      if (this.selectedRange.length === 0) {
        return Math.floor(this.company.totalIncome / 50);
      } else {
        return Math.floor(this.totalIncome / this.selectedRange.length);
      }
    }
  },
  watch: {
    $route: "fetchData",
    dates: "sliceIncome"
  },
  methods: {
    fetchData() {
      this.$store.getters.filteredCompanies.forEach(company => {
        if (company.id == this.$route.params.id) {
          this.company = company;
        }
      });
      this.sortIncomesDates();
      this.selectRange();
    },
    sortIncomesDates() {
      this.company.incomes.sort((dateOne, dateTwo) => {
        return Date.parse(dateOne.date) - Date.parse(dateTwo.date);
      });
    },
    selectRange() {
      this.dates.start = new Date(this.company.incomes[0].date);
      this.dates.end = new Date(this.company.incomes[49].date);
      return this.dates;
    },
    sliceIncome() {
      this.limitedTotalIncome = 0;

      this.selectedRange = this.company.incomes.filter(income => {
        return (
          Date.parse(income.date) >= Date.parse(this.dates.start) &&
          Date.parse(income.date) <= Date.parse(this.dates.end)
        );
      });

      return this.selectedRange;
    }
  },
  mounted() {
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
  &__details {
    width: 80%;
    margin: auto;
  }
  &__details > p {
    font-size: 1.2em;
    padding: 0.6em;
    text-align: left;
    border-bottom: 1px solid #fff;
  }
  &__properties {
    display: inline-block;
    padding-right: 0.5em;
  }
  &__date-picker {
    text-align: left;
    margin-top: 1em;
    label {
      padding-left: 0.5em;
    }
  }
  ::v-deep input {
    background-color: #4e4cb8;
    color: #bdb8b8c0;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #fff;
    font-size: 1.2em;
    padding: 0.8em;
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
    &__details {
      grid-area: details;
      margin: 1em auto;
    }
    &__chart {
      grid-area: chart;
    }
  }
}
</style>
