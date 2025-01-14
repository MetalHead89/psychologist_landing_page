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
import CmsArticleForm from '../_base_form.vue'
import { useBaseForm } from '../_base_form_composable'
import CmsUiConfirmModal from '@/components/ui/cms/modals/ConfirmModal.vue'
import { useModal } from 'vue-final-modal'

definePageMeta({
  layout: 'cms'
})

const { submit, isRequestInProgress, handleSubmitSuccess } = useForm()
const { form, footer } = useBaseForm()
const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const loadingOverlay = useLoadingOverlayStore()
const snackbar = useSnackbar()

const { open } = useModal({
  component: CmsUiConfirmModal,
  attrs: {
    title: 'Уверены, что хотите удалить статью?',
    subtitle: 'Данное действие приведет к безвозвратному удалению статьи. Все равно удалить?',
    confirmButtonText: 'Удалить',
    cancelButtonText: 'Отменить',
    confirmButtonTheme: 'remove',
    onConfirm: () => { removeArticle() }
  }
})

const footerSettings = computed(() => ({
  ...footer,
  submit: {
    text: 'Сохранить'
  },
  remove: {
    clickHandler: handleArticleRemove
  }
}))

onMounted(() => {
  loadingOverlay.setIsShow(true)

  $api.articles.get(route.params.id as string)
    .then(data => {
      Object.assign(form, data)
    }).
    catch(() => {
      snackbar.add({
        type: 'error',
        title: 'Ошибка',
        text: 'Произошла ошибка при получении статьи'
      })
      router.push({ name: 'admin-articles' })
    })
    .finally(() => {
      loadingOverlay.setIsShow(false)
    })
})

const handleSubmitForm = () => {
  submit(
    () => $api.articles.update(form),
    () => {
      handleSubmitSuccess()
      router.push({ name: 'admin-articles' })
    }
  )
}

const handleArticleRemove = () => {
  open()
}

const removeArticle = () => {
  loadingOverlay.setIsShow(true)
  $api.articles.delete(route.params.id as string)
    .then(() => {
      snackbar.add({
        type: 'success',
        title: 'Успех',
        text: 'Успешно удалено'
      })
      router.push({ name: 'admin-articles' })
    })
    .finally(() => {
      loadingOverlay.setIsShow(false)
    })
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
