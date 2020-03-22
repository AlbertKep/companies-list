<template>
  <div class="companies-list-container">
    <ul>
      <li
        v-for="company in companies"
        :key="company.id"
        class="companies-list-container__item"
      >
        {{ company.id }}| name: {{ company.name }}| city: {{ company.city }} |
        totalIncomes: {{ company.totalIncome }}
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
      return this.$store.state.companies;
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch("getCompanies");
  }
};
</script>
