<template>
  <div>
    <CmsArticleForm
      v-model="form"
      :is-request-in-progress="isRequestInProgress"
      :footer-settings="footerSettings"
      @submit="handleSubmitForm"
    />
  </div>
</template>

<script setup lang="ts">
import CmsArticleForm from './_base_form.vue'
import { useBaseForm } from './_base_form_composable'

definePageMeta({
  layout: 'cms'
})

const { submit, isRequestInProgress, handleSubmitSuccess } = useForm()
const { form, footer } = useBaseForm()
const { $api } = useNuxtApp()
const router = useRouter()

const footerSettings = computed(() => ({
  ...footer,
  submit: {
    text: 'Создать',
    clickHandler: () => {}
  }
}))

const handleSubmitForm = () => {
  submit(
    () => $api.articles.create(form),
    () => {
      handleSubmitSuccess()
      router.push({ name: 'admin-articles' })
    }
  )
}
</script>

<style lang="scss" scoped>
.article-form {
  .control-wrapper {
    margin-bottom: 20px;
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 30px;
  }
}
</style>
