<template>
  <div class="searcher-container">
    <form class="searcher-container__form">
      <input v-model="search" type="text" class="searcher-container__input" />
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "Search Company!"
    };
  },
  computed: {
    companies() {
      return this.$store.getters.sortCompaniesDescending;
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
    color: #ffffff6c;
  }
}
</style>
