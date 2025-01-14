<template>
  <CmsFeaturesForm
    class="article-form"
    :footer-settings="footerSettings"
    :is-loading="isRequestInProgress"
    @submit="$emit('submit')"
  >
    <CmsUiControlWrapper
      label="Название"
      error-key="name"
    >
      <CmsUiTextInput
        v-model="form.name"
        placeholder="Введите название статьи"
      />
    </CmsUiControlWrapper>

    <CmsUiControlWrapper
      label="Отображать на сайте"
      error-key="isActive"
    >
      <CmsUiToggle v-model="form.isActive" />
    </CmsUiControlWrapper>

    <CmsUiControlWrapper
      label="Slug"
      error-key="slug"
    >
      <CmsUiTextInput
        v-model="form.slug"
        placeholder="Введите slug"
      />
    </CmsUiControlWrapper>

    <CmsUiControlWrapper
      label="Изображение для превью статьи"
      error-key="previewImage"
    >
      <CmsUiCropper
        v-model="form.previewImage"
        v-model:init-image="form.previewImageUrl"
      />
    </CmsUiControlWrapper>

    <CmsUiControlWrapper
      label="Контент статьи"
      is-full-screen
      error-key="content"
    >
      <CmsUiWysiwygEditor v-model="form.content" />
    </CmsUiControlWrapper>

    <section>
      <h2>Сео настройки</h2>

      <CmsUiControlWrapper
        label="Заголовок"
        error-key="title"
      >
        <CmsUiTextInput
          v-model="form.title"
          placeholder="Введите заголовок"
        />
      </CmsUiControlWrapper>

      <CmsUiControlWrapper
        label="Описание"
        error-key="description"
      >
        <CmsUiTextarea
          v-model="form.description"
          placeholder="Введите описание"
        />
      </CmsUiControlWrapper>

      <CmsUiControlWrapper
        label="Ключевые слова"
        error-key="keywords"
      >
        <CmsUiTextarea
          v-model="form.keywords"
          placeholder="Введите ключевые слова"
        />
      </CmsUiControlWrapper>
    </section>
  </CmsFeaturesForm>
</template>

<script setup lang="ts">
export interface IForm {
    name: string,
    content: string,
    slug: string,
    title: string,
    description: string,
    keywords: string,
    isActive: boolean,
    previewImage: string,
    previewImageUrl?: string
  }

interface IProps {
  modelValue: IForm,
  isRequestInProgress?: boolean,
  footerSettings?: object
}

const props = defineProps<IProps>()
const emit = defineEmits(['update:model-value', 'submit'])

const form = computed({
  get() {
    return props.modelValue
  },

  set(value) {
    emit('update:model-value', value)
  }
})
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
