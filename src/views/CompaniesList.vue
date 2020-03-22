<template>
  <div class="companies-list">
    <app-header></app-header>
    <app-searcher></app-searcher>
    <app-companies-list></app-companies-list>
  </div>
</template>

<script>
import Header from "@/components/Companies/TheHeader.vue";
import Searcher from "@/components/Companies/Searcher.vue";
import CompaniesList from "@/components/Companies/CompaniesList.vue";

export default {
  name: "Home",
  components: {
    "app-header": Header,
    "app-searcher": Searcher,
    "app-companies-list": CompaniesList
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.companies-list {
  height: 100%;
}
</style>
