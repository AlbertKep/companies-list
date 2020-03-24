<template>
  <div class="companies-list-container">
    {{ companiesLength }}
    <div class="companies-list-container__properties">
      <span>ID</span>
      <span>Name</span>
      <span>City</span>
      <span>Total Income</span>
    </div>
    <ul class="companies-list-container__items">
      <li
        v-for="company in paginationCompanies"
        :key="company.id"
        class="companies-list-container__item"
      >
        <span>{{ company.id }}</span
        ><span>{{ company.name }}</span
        ><span>{{ company.city }}</span
        ><span>{{ company.totalIncome }}</span>
      </li>
    </ul>
    <div class="pagination-container">
      <button
        @click="prevPage"
        :disabled="pagination.prevButtonDisabled"
        class="pagination-container__button"
        :class="{ disabled: pagination.prevButtonDisabled }"
      >
        Prev
      </button>

      <button
        @click="nextPage"
        :disabled="pagination.nextButtonDisabled"
        class="pagination-container__button"
        :class="{ disabled: pagination.nextButtonDisabled }"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        currentPage: 0,
        lastPage: 10,
        prevButtonDisabled: false,
        nextButtonDisabled: false
      }
    };
  },
  computed: {
    companies() {
      return this.$store.getters.filteredCompanies;
    },
    paginationCompanies() {
      return this.companies.slice(
        this.pagination.currentPage,
        this.pagination.lastPage
      );
    },
    companiesLength() {
      return this.companies.length;
    }
  },
  methods: {
    prevPage() {
      if (this.pagination.currentPage <= 0) {
        this.pagination.prevButtonDisabled = true;
        return;
      }
      this.pagination.currentPage -= 10;
      this.pagination.lastPage -= 10;
    },
    nextPage() {
      if (this.pagination.lastPage >= this.companies.length) {
        this.pagination.nextButtonDisabled = true;
        return;
      }
      this.pagination.currentPage += 10;
      this.pagination.lastPage += 10;
    }
  },
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
.pagination-container {
  margin-top: 1em;
  position: fixed;
  bottom: 1.5em;
  left: 50%;
  transform: translate(-50%, -50%);
  &__button {
    color: #fff;
    padding: 0.5em 2em;
    border: none;
    cursor: pointer;
  }
}
.disabled {
  display: none;
}
</style>
