<template>
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
        :min-date="disabledMinDate()"
        :max-date="disabledMaxDate()"
        mode="range"
        color="purple"
        :masks="{ input: 'DD/MM/YY' }"
        :placeholder="dates"
        class="company__date-picker"
      ></v-date-picker>
    </div>
    <home-button></home-button>
  </div>
</template>
<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import HomeButton from "./TheHomeButton";

export default {
  data() {
    return {
      dates: {
        start: new Date(),
        end: new Date()
      },
      selectedRange: [],
      limitedTotalIncome: 0
    };
  },
  props: ["company"],
  components: {
    "v-date-picker": DatePicker,
    "home-button": HomeButton
  },
  watch: {
    dates: "sliceIncome"
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
  methods: {
    selectRange() {
      this.dates.start = new Date(this.company.incomes[0].date);
      this.dates.end = new Date(this.company.incomes[49].date);
      return this.dates;
    },
    sliceIncome() {
      this.limitedTotalIncome = 0;
      this.selectedRange = this.company.incomes.filter(income => {
        // console.log(Date.parse(income.date));

        return (
          Date.parse(income.date) >= Date.parse(this.dates.start) &&
          Date.parse(income.date) <= Date.parse(this.dates.end)
        );
      });

      return this.selectedRange;
    },
    disabledMinDate() {
      return Date.parse(this.company.incomes[0].date) - 1;
    },
    disabledMaxDate() {
      return Date.parse(this.company.incomes[49].date) + 1;
    }
  },
  created() {
    this.sliceIncome();
    this.selectRange();
  }
};
</script>
<style lang="scss" scoped>
.company {
  &__details {
    width: 80%;
    margin: auto;
  }
  &__details > p {
    font-size: 1em;
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
    ::v-deep input {
      background-color: #4e4cb8;
      color: #bdb8b8c0;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #fff;
      font-size: 1em;
      padding: 0.8em;
    }
  }
}
@media only screen and (min-width: 768px) {
  .company {
    &__details {
      grid-area: details;
      margin: 1em auto;
    }
  }
}
</style>
