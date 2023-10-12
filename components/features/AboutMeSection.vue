<template>
  <div class="about-me-section">
    <div class="content">
      <img
        src="@/assets/images/about_me.svg"
        alt="me picture"
        class="about-me__picture"
      >
      <div class="text">
        <h2 class="about-me__title">
          {{ $t('about_me.title') }}
        </h2>

        <div class="about-me__text">
          <p
            v-for="(paragraph, index) in $tm('about_me.text')"
            :key="index"
            class="about-me__paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { $gsap } = useNuxtApp()
let timeline: gsap.core.Timeline | null = null

onMounted(() => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    loadDesktopAnimation()
  } else {
    loadMobileAnimation()
  }
})

const loadMobileAnimation = () => {
  timeline = $gsap.timeline()

  timeline
    .from('.about-me__picture', {
      x: '-5vh',
      opacity: 0,
      duration: 0.5
    })
    .from('.about-me__title', {
      y: '-5vh',
      opacity: 0,
      duration: 0.5
    })
    .from('.about-me__paragraph', {
      x: '-5vw',
      opacity: 0,
      stagger: 0.3
    })

  ScrollTrigger.create({
    trigger: '.about-me-section',
    start: 'top 50%',
    toggleActions: 'play none none reverse',
    animation: timeline
  })
}

const loadDesktopAnimation = () => {
  timeline = $gsap.timeline()

  timeline
    .from('.about-me__title', {
      y: '-5vh',
      opacity: 0,
      duration: 0.5
    })
    .from('.about-me__paragraph', {
      x: '-5vw',
      opacity: 0,
      stagger: 0.3
    })

  ScrollTrigger.create({
    trigger: '.about-me-section',
    start: 'top 50%',
    toggleActions: 'play none none reverse',
    animation: timeline
  })
}
</script>

<style lang="scss" scoped>
.about-me-section {
  padding: 10vh $content-padding;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  &__picture {
    width: 80%;
  }

  @media screen and (min-width: $md) {
    .content {
      flex-direction: row;
      align-items: flex-start;
      gap: 5vw;
    }

    .about-me__picture {
      width: 30vw;
    }
  }
}
</style>
