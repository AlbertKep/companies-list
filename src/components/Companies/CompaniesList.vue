<template>
  <div class="companies-list-container">
    <app-loading v-if="isLoading"></app-loading>
    <div v-if="isFetched" class="is-fetched-container">
      <div class="companies-list-container__properties">
        <span>ID</span>
        <span>Name</span>
        <span>City</span>
        <span>Total Income</span>
      </div>
      <ul class="companies-list-container__items">
        <router-link
          tag="li"
          v-for="company in paginationCompanies"
          :key="company.id"
          :to="`/${company.id}`"
          class="companies-list-container__item"
        >
          <span>{{ company.id }}</span
          ><span>{{ company.name }}</span
          ><span>{{ company.city }}</span
          ><span>{{ company.totalIncome }}</span>
        </router-link>
      </ul>
      <div class="pagination-container">
        <button
          @click="prevPage"
          :disabled="prevButtonDisabled"
          class="pagination-container__button"
          :class="{ disabled: prevButtonDisabled }"
        >
          Prev
        </button>

        <button
          @click="nextPage"
          :disabled="nextButtonDisabled"
          class="pagination-container__button"
          :class="{ disabled: nextButtonDisabled }"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "@/components/Loading";

export default {
  data() {
    return {
      currentPage: 0,
      lastPage: 10,
      prevButtonDisabled: true,
      nextButtonDisabled: false
    };
  },
  components: {
    "app-loading": Loading
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    isFetched() {
      return this.$store.state.isFetched;
    },
    companies() {
      return this.$store.getters.filteredCompanies;
    },
    paginationCompanies() {
      return this.companies.slice(this.currentPage, this.lastPage);
    },
    companiesLength() {
      return this.companies.length;
    }
  },
  watch: {
    currentPage() {
      if (this.currentPage === 0) {
        this.prevButtonDisabled = true;
      } else {
        this.prevButtonDisabled = false;
      }
    },
    lastPage() {
      if (this.lastPage === this.companies.length) {
        this.nextButtonDisabled = true;
      } else {
        this.nextButtonDisabled = false;
      }
    }
  },
  methods: {
    prevPage() {
      this.currentPage -= 10;
      this.lastPage -= 10;
    },
    nextPage() {
      this.currentPage += 10;
      this.lastPage += 10;
    },
    goToCompany(id) {
      this.$router.push(`/${id}`);
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
    &:hover {
      background: #fff;
      color: #4e4cb8;
      cursor: pointer;
    }
  }
  &__item span {
    padding: 1em 0;
    display: block;
    border-bottom: 2px solid #fff;
    font-size: 0.6em;
  }
}
.pagination-container {
  margin-top: 1em;
  position: fixed;
  bottom: 1.5em;
  left: 50%;
  transform: translate(-50%, -50%);
  &__button {
    background: #4e4cb8;
    color: #fff;
    padding: 0.5em 2em;
    border: 1px solid;
    &:hover {
      background: #fff;
      color: #4e4cb8;
      cursor: pointer;
    }
  }
}
.disabled {
  display: none;
}

@media only screen and (min-width: 425px) {
  .companies-list-container {
    &__properties span {
      font-size: 0.9em;
    }
    &__item span {
      font-size: 0.6em;
    }
  }
}
@media only screen and (min-width: 768px) {
  .companies-list-container {
    &__properties span {
      font-size: 1em;
    }
    &__item span {
      font-size: 0.7em;
    }
  }
}
@media only screen and (min-width: 1024px) {
  .companies-list-container {
    &__properties span {
      font-size: 1.2em;
    }
    &__item span {
      font-size: 0.9em;
    }
  }
  .pagination-container {
    &__button {
      font-size: 1em;
    }
  }
}
</style>
