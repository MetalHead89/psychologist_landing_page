<template>
  <div class="consultation-section">
    <h2 v-html="$t('consultation.title')" />
    <ul class="questions">
      <li
        v-for="(question, index) in $tm('consultation.questions')"
        :key="index"
        class="consultation-section__question"
      >
        <span>{{ question }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
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
  timeline = $gsap.timeline({
    scrollTrigger: {
      trigger: '.consultation-section',
      start: 'top 30%'
    }
  })

  timeline
    .from('.consultation-section__question', {
      opacity: 0,
      x: '-20px',
      stagger: 0.3
    })
}

const loadDesktopAnimation = () => {
  timeline = $gsap.timeline({
    scrollTrigger: {
      trigger: '.consultation-section',
      start: 'top 30%'
    }
  })

  timeline
    .from('.consultation-section__question', {
      opacity: 0,
      x: '-20px',
      stagger: 0.2
    })
}
</script>

<style lang="scss" scoped>
$questions-gap: 30px;

.consultation-section {
  padding: 10vh $content-padding;
  box-sizing: border-box;

  .questions {
    @media screen and (min-width: $md) {
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      row-gap: 80px;
    }
  }

  &__question {
    @media screen and (min-width: $md) {
      display: flex;
      justify-content: center;
      text-align: center;
      list-style-type: none;
      width: 100%;
      max-width: calc(100% / 3 - $questions-gap);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 50px;
        background: $primary-background;
        z-index: -1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(-5deg);
        border-radius: 30px;
      }
    }
  }
}
</style>
