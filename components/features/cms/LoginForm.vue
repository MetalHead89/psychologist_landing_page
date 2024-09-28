<template>
  <div class="login-form">
    <h1 class="title">
      Вход
    </h1>

    <UiTextInput v-model="form.login" />
    <UiTextInput v-model="form.password" type="password" />

    <UiButton
      :is-loading="isRequestInProgress"
      class="login-button"
      :disabled="isDisabledSubmitButton"
      @click="handleLoginButtonClick"
    >
      Войти
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
import { CMS_ROUTE_DEFAULT } from '@/shared/constants.js'

const { $api } = useNuxtApp()
const {
  handleSubmitFail,
  setRequestProgressStatus,
  isRequestInProgress
} = useForm()
const { setAuthData } = useAuth()
const router = useRouter()


const form = reactive({
  login: '',
  password: ''
})

const isDisabledSubmitButton = computed(() => {
  return !form.login || !form.password
})

const handleLoginButtonClick = () => {
  setRequestProgressStatus(true)

  $api.auth.login(form)
    .then(data => {
      setAuthData(data)

      router.push({ name: CMS_ROUTE_DEFAULT })
    })
    .catch(handleSubmitFail)
    .finally(() => setRequestProgressStatus(false))
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: $sm) {
    max-width: $sm;
    border: 1px solid $primary-color;
    border-radius: $base-border-radius;
    box-shadow: $card-shadow;
  }

  .title {
    text-align: center;
  }
}
</style>
