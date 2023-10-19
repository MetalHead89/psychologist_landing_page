<template>
  <div class="feedback">
    <h2 class="feedback__title">
      {{ $t('feedback.title') }}
    </h2>

    <form class="form">
      <div class="inputs-wrapper section-wrapper">
        <div class="input-wrapper feedback__field">
          <UiTextInput
            v-model="form.name"
            :placeholder="$t('feedback.fields.name')"
            error-key="name"
          />
        </div>

        <div class="input-wrapper feedback__field">
          <UiTextInput
            v-model="form.email"
            :placeholder="$t('feedback.fields.mail')"
            error-key="email"
          />
        </div>
      </div>

      <div class="section-wrapper textarea-wrapper feedback__field">
        <UiTextarea
          v-model="form.appealReason"
          :placeholder="$t('feedback.fields.description')"
          error-key="appealReason"
        />
      </div>

      <UiButton
        class="feedback__submit"
        @click="onSubmit"
      >
        {{ $t('feedback.submit') }}
      </UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const { $gsap } = useNuxtApp()
const { setErrors } = useForm()
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
    toggleActions: 'play none none none',
    animation: timeline
  })
}

const form = reactive({
  name: '',
  email: '',
  appealReason: ''
})

const rules = {
  name: {
    required: helpers.withMessage('Не может быть пустым', required)
  },
  email: {
    required: helpers.withMessage('Не может быть пустым', required),
    email: helpers.withMessage('Не верный формат почты', email)
  },
  appealReason: {
    required: helpers.withMessage('Не может быть пустым', required)
  }
}

const v$ = useVuelidate(rules, form)

const onSubmit = async () => {
  await v$.value.$validate()
  setErrors(v$, form)

  if (v$.value.$error) {
    return null
  }

  $fetch('/api/send_email', {
    method: 'POST',
    body: { ...form }
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
    gap: 10px;
  }

  .section-wrapper {
    @media screen and (min-width: $lg) {
      width: calc( ( 100% - 20px ) / 2 );
    }
  }

  .textarea-wrapper {
    align-self: stretch;

    .control-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  :deep(.textarea) {
    min-height: 100px;
    height: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    @media screen and (min-width: $md) {
      align-items: flex-start;
    }

    @media screen and (min-width: $lg) {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
}
</style>
