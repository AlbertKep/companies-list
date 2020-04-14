<template>
  <div class="companies-list">
    <app-header></app-header>
    <app-search></app-search>
    <companies-list></companies-list>
  </div>
</template>

<script>
import Header from "@/components/Companies/TheHeader.vue";
import Search from "@/components/Companies/Search.vue";
import CompaniesList from "@/components/Companies/CompaniesList.vue";

export default {
  name: "Companies",
  components: {
    "app-header": Header,
    "app-search": Search,
    "companies-list": CompaniesList
  }
};
</script>

<style lang="scss" scoped>
.companies-list {
  height: 100vh;
  background: #4e4cb8;
}
</style>
