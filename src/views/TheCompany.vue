<template>
  <div class="company">
    <div class="company__details">
      <h1 class="company__name">{{ company.name }}</h1>

      <p>
        <span>id:</span>
        <span>{{ company.id }}</span>
      </p>
      <p>city:{{ company.city }}</p>
      <p>Total Income: {{ totalIncome }}</p>
      <p>Average Income: {{ averageIncome }}</p>
      <v-date-picker
        v-model="dates"
        :value="dates"
        mode="range"
        color="purple"
        :masks="{ input: 'DD/MM/YY' }"
        :placeholder="dates"
      ></v-date-picker>
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
        return this.company.totalIncome / 50;
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

  &__details > p {
    font-size: 1.2em;
    padding: 0.5em 1em;
    text-align: left;
    border-bottom: 1px solid #fff;
  }
  &__details > span {
    display: block;
    padding-right: 0.5em;
  }
  &__date-picker {
    color: #4e4cb8;
    width: 100vw;
  }
}
</style>
