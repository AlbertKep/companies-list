<template>
  <div class="companies-list-container">
    <div class="companies-list-container__properties">
      <span>ID</span>
      <span>Name</span>
      <span>City</span>
      <span>Total Income</span>
    </div>
    <ul class="companies-list-container__items">
      <li
        v-for="company in companies"
        :key="company.id"
        class="companies-list-container__item"
      >
        <span>{{ company.id }}</span
        ><span>{{ company.name }}</span
        ><span>{{ company.city }}</span
        ><span>{{ company.totalIncome }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    companies() {
      return this.$store.getters.sortCompaniesDescending;
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch("getCompanies");
  }
};
</script>
<style lang="scss" scoped>
.companies-list-container {
  padding: 2em;
  &__properties {
    display: grid;
    grid-template-columns: 10% repeat(3, 30%);
  }
  &__properties span {
    padding: 0.4em 1em;
    border-bottom: 2px solid #fff;
    width: 100%;
    font-size: 0.7em;
  }
  &__items {
    margin-top: 2em;
  }
  &__item {
    list-style-type: none;
    display: grid;
    grid-template-columns: 10% repeat(3, 30%);
  }
  &__item span {
    padding: 1em 0;
    display: block;
    border-bottom: 2px solid #fff;
    font-size: 0.5em;
  }
}
</style>
