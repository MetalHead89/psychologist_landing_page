<template>
  <div class="feedback">
    <h2 class="feedback__title">
      {{ $t('feedback.title') }}
    </h2>

    <form class="form">
      <div class="inputs-wrapper">
        <div class="input-wrapper feedback__field">
          <UiTextInput
            :placeholder="$t('feedback.fields.name')"
          />
        </div>

        <div class="input-wrapper feedback__field">
          <UiTextInput
            :placeholder="$t('feedback.fields.mail')"
          />
        </div>
      </div>

      <UiTextarea
        :placeholder="$t('feedback.fields.description')"
        class="feedback__field"
      />

      <UiButton class="feedback__submit">
        {{ $t('feedback.submit') }}
      </UiButton>
    </form>
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
    .from('.feedback__title', {
      y: '-20px',
      opacity: 0,
      duration: 0.5
    })
    .from('.feedback__field', {
      x: '-20px',
      opacity: 0,
      stagger: 0.4
    })
    .from('.feedback__submit', {
      y: '-20px',
      opacity: 0
    })

  ScrollTrigger.create({
    trigger: '.feedback',
    start: 'top 50%',
    toggleActions: 'play none none reverse',
    animation: timeline
  })
}
</script>

<style lang="scss" scoped>
.feedback {
  padding: 10vh $content-padding;

  &__title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }

  .input-wrapper {
    width: 100%;
  }

  .inputs-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media screen and (min-width: $lg) {
      width: calc( ( 100% - 20px ) / 2 );
    }
  }

  .textarea {
    @media screen and (min-width: $lg) {
      width: calc( ( 100% - 20px ) / 2 );
      min-height: 100px;
      align-self: stretch;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media screen and (min-width: $md) {
      align-items: flex-start;
    }

    @media screen and (min-width: $lg) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
