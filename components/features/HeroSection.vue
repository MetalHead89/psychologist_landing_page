<template>
  <div class="hero-section">
    <h1 class="hero-text">
      {{ $t('hero.text') }}
    </h1>

    <img
      src="@/assets/images/photo.svg"
      alt="photo"
      class="photo"
    >
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  loadAnimation()
})

const loadAnimation = () => {
  $gsap.from('.hero-text', {
    x: '-10vw',
    opacity: 0,
    duration: 1,
    autoAlpha: 0
  })

  $gsap.from('.photo', {
    x: '10vw',
    opacity: 0,
    duration: 1,
    autoAlpha: 0
  })

  $gsap.to('.hero-text', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      scrub: true
    },
    yPercent: -30,
    opacity: 0,
    immediateRender: false
  })

  $gsap.to('.photo', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom 33%',
      scrub: true
    },
    yPercent: 20,
    opacity: 0,
    immediateRender: false
  })
}
</script>

<style lang="scss" scoped>
.hero-section {
  width: 100%;
  height: 100vh;
  position: relative;

  .hero-text {
    position: absolute;
    bottom: 5vh;
    padding-left: 10vw;
    width: min-content;
    font-size: calc(#{$view-size-index} * 6);
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
    visibility: hidden;
  }

  .photo {
    position: absolute;
    width: calc(#{$view-size-index} * 30);
    left: 40vw;
    top: 11vh;
    visibility: hidden;
    z-index: -1;

    // @media screen and (orientation: portrait) {
    //   top: -500px;
    // }
  }

  @media screen and (orientation: portrait) {
    $photo-width: calc(#{$view-size-index} * 35);

    .hero-text {
      padding:  5vw 5vw 5vw 10vw;
      border-radius: 0 5vw 5vw 0;
      font-size: 15vw;
      background: #00000064;
      color: #ffffff;
      bottom: 4.5vh;
    }
    .photo {
      // top: auto;
      left: calc(50% - (#{$photo-width} / 2));
      width: $photo-width;
    }
  }
}
</style>
