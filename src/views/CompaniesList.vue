<template>
  <div class="companies-list">
    <app-loading></app-loading>
    <app-header></app-header>
    <app-searcher></app-searcher>
    <companies-list></companies-list>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

import Header from "@/components/Companies/TheHeader.vue";
import Searcher from "@/components/Companies/Searcher.vue";
import CompaniesList from "@/components/Companies/CompaniesList.vue";

export default {
  name: "Companies",
  components: {
    "app-loading": Loading,
    "app-header": Header,
    "app-searcher": Searcher,
    "companies-list": CompaniesList
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.companies-list {
  height: 100vh;
  background: #4e4cb8;
}
</style>
