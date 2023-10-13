<template>
  <div class="skills-section">
    <h2 class="skills__title">
      {{ $t('skills.title') }}
    </h2>
    <div class="skills">
      <UiSkillCard
        v-for="({ title, text }, index) in $tm('skills.cards')"
        :key="index"
        :title="title"
        :text="text"
        class="skills__card"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { $gsap } = useNuxtApp()
let timeline: gsap.core.Timeline | null = null

onMounted(() => {
  loadAnimation()
  // if (window.matchMedia('(min-width: 768px)').matches) {
  //   loadDesktopAnimation()
  // } else {
  //   loadMobileAnimation()
  // }
})

const loadAnimation = () => {
  timeline = $gsap.timeline()

  timeline
    .from('.skills__title', {
      x: '-20px',
      opacity: 0,
      duration: 0.5
    })
    .from('.skills__card', {
      y: '-20px',
      opacity: 0,
      stagger: 0.3
    })

  ScrollTrigger.create({
    trigger: '.skills-section',
    start: 'top 50%',
    toggleActions: 'play none none reverse',
    animation: timeline
  })
}

// const loadDesktopAnimation = () => {
//   timeline = $gsap.timeline()

//   timeline
//     .from('.skills__title', {
//       y: '-5vh',
//       opacity: 0,
//       duration: 0.5
//     })
//     .from('.skills__card', {
//       x: '-5vw',
//       opacity: 0,
//       stagger: 0.3
//     })

//   ScrollTrigger.create({
//     trigger: '.skills-section',
//     start: 'top 50%',
//     toggleActions: 'play none none reverse',
//     animation: timeline
//   })
// }
</script>

<style lang="scss" scoped>
.skills-section {
  background: #f4f7f9;
  padding: 10vh $content-padding;

  .skills {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;

    @media screen and (min-width: $md) {
      justify-content: space-between;
    }
  }

  .skills__title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }

  .skills__card {
    @media screen and (min-width: $sm) {
      max-width: 60%;
    }

    @media screen and (min-width: $md) {
      max-width: 31%;
    }

    @media screen and (min-width: $lg) {
      max-width: 18%;
    }
  }
}
</style>
