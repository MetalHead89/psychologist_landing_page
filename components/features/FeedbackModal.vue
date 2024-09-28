<template>
  <UiModal ref="modal">
    <form class="feedback-form" @submit.prevent="handleFormSubmit">
      <h2>Оставьте отзыв</h2>

      <UiTextInput
        v-model.trim="form.name"
        placeholder="Ваше имя"
        error-key="name"
      />

      <UiControlWrapper>
        <h3>Ваша оценка</h3>

        <div class="rating-wrapper">
          <UiStarRating v-model:rating="form.rating" />
        </div>
      </UiControlWrapper>

      <UiTextarea v-model.trim="form.feedback" placeholder="Ваш отзыв" />

      <UiButton type="submit" :is-loading="isRequestInProgress">
        Отправить
      </UiButton>
    </form>
  </UiModal>
</template>

<script lang="ts" setup>
import UiModal from '@/components/ui/modals/Modal.vue'

const snackbar = useSnackbar()
const { $api } = useNuxtApp()
const {
  submit,
  isRequestInProgress
} = useForm()

const modal = ref<typeof UiModal | null>(null)

const form = reactive({
  name: '',
  rating: 0,
  feedback: ''
})

const handleSubmitSuccess = () => {
  modal.value?.close()

  snackbar.add({
    type: 'success',
    title: 'Сохранено',
    text: 'Спасибо за отзыв'
  })
}

const handleFormSubmit = () => {
  submit(
    () => $api.feedback.add(form),
    handleSubmitSuccess
  )
}
</script>

<style lang="scss" scoped>

.feedback-form {
  position: relative;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: $sm) {
    align-items: flex-start;
  }

  h3 {
    margin: 0;
  }

  h2,
  h3 {
    text-align: center;

    @media screen and (min-width: $sm) {
      text-align: left;
    }
  }

  .rating-wrapper {
    margin-top: 5px;
    display: flex;
    justify-content: center;

    @media screen and (min-width: $sm) {
      justify-content: flex-start;
    }
  }
}
</style>
