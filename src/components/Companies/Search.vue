<template>
  <div class="searcher-container">
    <form class="searcher-container__form">
      <input
        v-on:input="searchCompany($event, search)"
        placeholder="Search Company!"
        type="text"
        class="searcher-container__input"
      />
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    companies() {
      return this.$store.getters.sortCompaniesDescending;
    }
  },
  methods: {
    searchCompany(event) {
      this.search = event.target.value;
      this.$store.dispatch("searchCompany", this.search);
    }
  }
};
</script>

<style lang="scss" scoped>
.searcher-container {
  padding: 2em;
  &__input {
    width: 100%;
    padding: 0.5em 1em;
    background: transparent;
    border: none;
    border-bottom: 2px solid #fff;
    caret-color: #fff;
    color: #bdb8b8c0;
  }
  ::placeholder {
    color: #bdb8b8c0;
  }
}
@media only screen and (min-width: 425px) {
  .searcher-container {
    &__input {
      font-size: 0.9em;
    }
  }
}
@media only screen and (min-width: 768px) {
  .searcher-container {
    &__input {
      font-size: 1em;
    }
  }
}
@media only screen and (min-width: 1024px) {
  .searcher-container {
    &__input {
      font-size: 1.2em;
    }
  }
}
</style>
