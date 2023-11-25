<template>
  <div class="page-section feedback-section">
    <h2 class="feedback__title">
      {{ $t('feedback.title') }}
    </h2>

    <form class="form">
      <section class="form-section">
        <h3>{{ $t('feedback.about_you') }}</h3>

        <UiTextInput
          v-model="form.name"
          :placeholder="$t('feedback.fields.name')"
          error-key="name"
        />

        <UiTextInput
          v-model="form.age"
          :placeholder="$t('feedback.fields.age')"
          error-key="age"
          mask="###"
        />
      </section>

      <section class="form-section">
        <h3>{{ $t('feedback.reason') }}</h3>

        <UiMultiSelect
          v-model="form.anxiety"
          :options="getOptions(ANXIETY as unknown as string[], 'feedback.selects.anxiety')"
          :placeholder="$t('feedback.fields.anxiety')"
          error-key="anxiety"
        />

        <UiTextarea
          v-model="form.anxietyDescription"
          :placeholder="$t('feedback.fields.anxiety_description')"
          error-key="anxietyDescription"
        />
      </section>

      <section class="form-section">
        <h3>{{ $t('feedback.how_to_contact_you') }}</h3>

        <UiSelect
          v-model="form.answerTarget"
          :options="getOptions(FEEDBACK_TYPE as unknown as string[], 'feedback.selects.feedback_type')"
          :placeholder="$t('feedback.fields.answer_target')"
          error-key="answerTarget"
        />

        <UiTextInput
          v-if="isFeedbackTypeEMail"
          v-model="form.email"
          :placeholder="$t('feedback.fields.mail')"
          error-key="email"
        />

        <UiPhoneInput
          v-else-if="form.answerTarget"
          v-model="form.phone"
          :placeholder="$t('feedback.fields.phone')"
          error-key="phone"
        />
      </section>

      <UiCheckbox
        v-model="form.consentProcessing"
        :label="$t('feedback.fields.consent_processing')"
        error-key="consentProcessing"
      >
        <i18n-t
          keypath="feedback.fields.consent_processing"
          tag="span"
          scope="global"
        >
          <template #privacy>
            <NuxtLink
              :to="{ name: 'privacy' }"
              target="_blank"
              class="link-global"
            >
              {{ $t('feedback.fields.privacy') }}
            </NuxtLink>
          </template>
        </i18n-t>
      </UiCheckbox>

      <!-- <div class="inputs-wrapper section-wrapper">
        <div class="input-wrapper feedback__field">
        </div>

        <div class="input-wrapper feedback__field">
        </div> -->

      <!-- <div class="section-wrapper textarea-wrapper feedback__field">
        <UiTextarea
          v-model="form.appealReason"
          :placeholder="$t('feedback.fields.description')"
          error-key="appealReason"
        />
      </div> -->

      <UiButton
        :is-loading="isLoading"
        class="feedback__submit"
        @click="onSubmit"
      >
        {{ $t('feedback.submit') }}
      </UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf, email, helpers, sameAs } from '@vuelidate/validators'
import { ANXIETY, FEEDBACK_TYPE } from '@/shared/constants'
import { useMetrika } from '~/composables/metrika'

// const { $gsap } = useNuxtApp()
const { setErrors, afterRequest, isLoading } = useForm()
const { t } = useI18n()
const { getOptions } = useOptions()
const { metrika } = useMetrika()
// let timeline: gsap.core.Timeline | null = null

onMounted(() => {
  // loadAnimation()
})

// const loadAnimation = () => {
//   timeline = $gsap.timeline()

//   timeline
//     .from('.feedback__title', {
//       y: '-20px',
//       opacity: 0,
//       duration: 0.5
//     })
//     .from('.feedback__field', {
//       x: '-20px',
//       opacity: 0,
//       stagger: 0.4
//     })
//     .from('.feedback__submit', {
//       y: '-20px',
//       opacity: 0
//     })

//   ScrollTrigger.create({
//     trigger: '.feedback',
//     start: 'top 50%',
//     toggleActions: 'play none none none',
//     animation: timeline
//   })
// }

const form = reactive({
  name: '',
  age: '',
  anxiety: [],
  anxietyDescription: '',
  answerTarget: '',
  phone: '',
  email: '',
  consentProcessing: false
})

const isFeedbackTypeEMail = computed(() => {
  return form.answerTarget === 'email'
})

const rules = {
  name: {
    required: helpers.withMessage(t('feedback.errors.cannot_be_empty'), required)
  },
  age: {
    required: helpers.withMessage(t('feedback.errors.cannot_be_empty'), required)
  },
  anxiety: {
    required: helpers.withMessage(t('feedback.errors.cannot_be_empty'), required)
  },
  answerTarget: {
    required: helpers.withMessage(t('feedback.errors.cannot_be_empty'), required)
  },
  email: {
    requiredIfEmpty: helpers.withMessage(
      t('feedback.errors.cannot_be_empty'),
      requiredIf(() => isFeedbackTypeEMail.value)
    ),
    requiredIfWrongFormat: helpers.withMessage(
      t('feedback.errors.invalid_email_format'),
      requiredIf(() => !form.answerTarget && isFeedbackTypeEMail.value) && email
    )
  },
  phone: {
    requiredIfEmpty: helpers.withMessage(
      t('feedback.errors.cannot_be_empty'),
      requiredIf(() => !!form.answerTarget && !isFeedbackTypeEMail.value)
    ),
    requiredIfWrongFormat: helpers.withMessage(
      t('feedback.errors.invalid_phone'),
      (value: string) => !form.answerTarget || !!isFeedbackTypeEMail.value || phoneWithoutFormat(value).length === 11
      // requiredIf(() => !!form.answerTarget && !isFeedbackTypeEMail.value) &&
      //   value => phoneWithoutFormat(value).length === 11
    )
  },
  consentProcessing: {
    sameAs: helpers.withMessage(
      t('feedback.errors.consent_processing_cannot_be_false'),
      sameAs(!form.consentProcessing)
    )
  }
}

const v$ = useVuelidate(rules, form)

const onSubmit = async () => {
  metrika('reachGoal', 'clickToSignUpForConsultation')
  await v$.value.$validate()

  setErrors(v$, rules)

  if (v$.value.$error) {
    return null
  }

  isLoading.value = true

  const response = $fetch('/api/send_email', {
    method: 'POST',
    body: {
      ...form,
      age: form.age === '' ? null : Number(form.age),
      phone: phoneWithoutFormat(form.phone)
    }
  })
    .then(() => {
      return Promise.resolve({
        title: t('feedback.snackbar.success_title'),
        text: t('feedback.snackbar.success_text')
      })
    })

  afterRequest(response)
}
</script>

<style lang="scss" scoped>
.feedback-section {
  padding: 8vh $content-padding;
  scroll-margin-top: 79px;

  &__title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }

  .form-section {
    width: 100%;

    @media screen and (min-width: $lg) {
      text-align: left;
      max-width: 700px;
    }

    @media screen and (min-width: $xl) {
      width: calc(100% / 3 - 20px);
    }
  }

  // .input-wrapper {
  //   width: 100%;
  // }

  // .inputs-wrapper {
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   gap: 10px;
  // }

  // .section-wrapper {
  //   @media screen and (min-width: $lg) {
  //     width: calc( ( 100% - 20px ) / 2 );
  //   }
  // }

  // .textarea-wrapper {
  //   align-self: stretch;

  //   .control-wrapper {
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  //   }
  // }

  // :deep(.textarea) {
  //   min-height: 100px;
  //   height: 100%;
  // }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    // gap: 10px;

    @media screen and (min-width: $md) {
      align-items: flex-start;
    }

    @media screen and (min-width: $xl) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      column-gap: 20px;
    }
  }
}
</style>
