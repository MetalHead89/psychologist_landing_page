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
          <p class="about-me__text-section">
            {{ $t('about_me.name') }}
          </p>

          <p
            class="about-me__text-section"
            v-html="$t('about_me.education')"
          />

          <h3 class="about-me__text-section about-me__section-title">
            {{ $t('about_me.tasks_title') }}
          </h3>

          <ul class="list">
            <li
              v-for="(item, index) in $tm('about_me.tasks')"
              :key="index"
              class="about-me__task-item"
            >
              {{ item }}
            </li>
          </ul>
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
    .from('.about-me__text-section', {
      x: '-5vw',
      opacity: 0,
      stagger: 0.3
    })
    .from('.about-me__task-item', {
      y: '-5px',
      opacity: 0,
      stagger: 0.3
    })

  ScrollTrigger.create({
    trigger: '.about-me-section',
    start: 'top 50%',
    toggleActions: 'play none none none',
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
    .from('.about-me__text-section', {
      x: '-5vw',
      opacity: 0,
      stagger: 0.3
    })
    .from('.about-me__task-item', {
      y: '-1vh',
      opacity: 0,
      stagger: 0.3
    })

  ScrollTrigger.create({
    trigger: '.about-me-section',
    start: 'top 50%',
    toggleActions: 'play none none none',
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

  .about-me__section-title {
    margin-bottom: 1vh;
  }

  .list {
    margin: 0;
  }

  .about-me__title {
      margin-top: 30px;

      @media screen and (min-width: $md) {
        margin-top: 0;
      }
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
