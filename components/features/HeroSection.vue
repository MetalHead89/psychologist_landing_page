<template>
  <div class="hero-section">
    <h1 class="title">
      Екатерина Бакалова
    </h1>

    <div class="subtitle">
      Практикующий психолог
    </div>

    <div class="next-button-wrapper">
      <button
        type="button"
        class="go-to-next-button"
        @click="handleGoToNextClick"
      >
        <i class="ic-chevron-down" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleGoToNextClick = () => {
  const aboutMeSection = document.querySelector('.about-me-section')
  aboutMeSection?.scrollIntoView()
}
</script>

<style lang="scss" scoped>
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  height: 100svh;
  background: url('/assets/images/noise_diagonal.webp') repeat, $primary-color;
  background-blend-mode: color-burn;
  color: #ffffff;
  position: relative;

  .title {
    text-transform: uppercase;
    font-size: 7vw;
    margin: 0;

    @media screen and (min-width: $md) {
      font-size: 4vw;
    }
  }

  .subtitle {
    font-size: 5vw;
    margin: 3vh 0;

    @media screen and (min-width: $md) {
      font-size: 3vw;
    }
  }

  .go-to-next-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    background: #ffffff;
    animation: myAnim 1s infinite alternate linear;
    position: absolute;
    border: none;
    padding: 0;
    color: $primary-color;
    font-size: 10vw;
    left: 50%;
    bottom: 10vh;
    transform: translate(-50%, 0);
    cursor: pointer;

    @media screen and (min-width: $md) {
      width: 4vw;
      height: 4vw;
      font-size: 4vw;
    }
  }
}

@keyframes myAnim {
  0% {
    transform: translate(-50%, 0);
  }
  100% {
    transform: translate(-50%, 20%);
  }
}
</style>
