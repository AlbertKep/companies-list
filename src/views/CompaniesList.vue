<template>
  <div class="companies-list">
    <app-header></app-header>
    <app-companies-list></app-companies-list>
  </div>
</template>

<script>
import Header from "@/components/Companies/TheHeader.vue";
import CompaniesList from "@/components/Companies/CompaniesList.vue";

export default {
  name: "Home",
  components: {
    "app-header": Header,
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
