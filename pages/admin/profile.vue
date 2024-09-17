<template>
  <CmsFeaturesForm
    :footer-settings="footerSettings"
    :is-loading="isRequestInProgress"
    @submit="handleSubmitForm"
  >
    <div class="profile-form">
      <CmsUiControlWrapper error-key="name">
        <CmsUiTextInput
          v-model="form.name"
          placeholder="Имя"
        />
      </CmsUiControlWrapper>

      <div class="password-section">
        <div class="note">
          Заполните эти поля, если хотите изменить пароль
        </div>

        <CmsUiControlWrapper error-key="password">
          <CmsUiTextInput
            v-model="form.password"
            placeholder="Новый пароль"
            type="password"
          />
        </CmsUiControlWrapper>

        <CmsUiControlWrapper error-key="retryPassword">
          <CmsUiTextInput
            v-model="form.retryPassword"
            placeholder="Повтор пароля"
            type="password"
          />
        </CmsUiControlWrapper>
      </div>
    </div>
  </CmsFeaturesForm>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cms'
})

const { submit, isRequestInProgress, handleSubmitSuccess } = useForm()
const { $api } = useNuxtApp()
const userStore = useUserStore()

const footerSettings = {
  submit: {
    text: 'Сохранить',
    clickHandler: () => {}
  }
}

const form = reactive({
  name: '',
  password: '',
  retryPassword: ''
})

onMounted(() => {
  form.name = userStore.user?.name || ''
})

const handleSubmitForm = () => {
  submit(
    () => $api.profile.update(form),
    userData => {
      userStore.setUser(userData as TUserData)
      handleSubmitSuccess()
    }
  )
}
</script>

<style lang="scss" scoped>
.profile-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: $cms-form-gap;

  .note {
    color: $cms-muted-color;
  }

  .password-section {
    display: flex;
    flex-direction: column;
    gap: $cms-form-gap;
    border: 1px dashed $cms-muted-color;
    width: 100%;
    padding: $cms-horizontal-padding;
    border-radius: $cms-border-radius;

    @media screen and (min-width: $sm) {
      width: 440px;
    }
  }
}
</style>
