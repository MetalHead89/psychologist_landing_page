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
    toggleActions: 'play none none none',
    animation: timeline
  })
}
</script>

<style lang="scss" scoped>
$cards-gap: 30px;

@function card-width($cards-count) {
  @return calc(100% / $cards-count - ($cards-count * $cards-gap));
}

.skills-section {
  background: #f4f7f9;
  padding: 10vh $content-padding;

  .skills {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: $cards-gap;
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
      max-width: card-width(2);
    }

    @media screen and (min-width: $lg) {
      max-width: card-width(3);
    }

    @media screen and (min-width: $xl) {
      max-width: card-width(4);
    }
  }
}
</style>
