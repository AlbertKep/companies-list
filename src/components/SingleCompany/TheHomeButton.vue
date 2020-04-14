<template>
  <div class="home-button-container">
    <button @click="goHome()" class="home-button-container__button">
      Back
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
.home-button-container {
  display: none;
  text-align: left;
  margin-top: 5em;
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
@media only screen and (min-width: 768px) {
  .home-button-container {
    display: block;
  }
}
</style>