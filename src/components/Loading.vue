<template>
  <div class="loading-container">
    <p class="loading-container__title">Loading</p>
    <div class="loading-container__dots">
      <div class="loading-container__dot loading-container__dot--one">
        1
      </div>

      <div class="loading-container__dot loading-container__dot--two">2</div>
      <div class="loading-container__dot loading-container__dot--three">3</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.loading-container {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__title {
    font-size: 1.5em;
  }
  &__dots {
    display: flex;
    align-content: space-between;
  }
  &__dot {
    width: 1em;
    height: 1em;
    background-color: #fff;
    border-radius: 50%;
    margin: 0.5em;
  }
  &__dot--one {
    animation: bounce 1s infinite;
  }
  &__dot--two {
    animation: bounce 1.2s infinite;
  }
  &__dot--three {
    animation: bounce 1.5s infinite;
  }
}
@media only screen and (min-width: 768px) {
  .loading-container {
    &__title {
      font-size: 2em;
    }
    &__dot {
      width: 1.5em;
      height: 1.5em;
    }
  }
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>