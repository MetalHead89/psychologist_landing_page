<template>
  <article class="article">
    <div class="breadcrumbs-wrapper">
      <UiBreadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" />
    </div>

    <h1 class="title">
      {{ name }}
    </h1>

    <div v-if="createdAt" class="created-date">
      {{ DateTime.fromISO(createdAt as unknown as string).setLocale('ru').toLocaleString(DateTime.DATE_MED) }}
    </div>

    <div class="delimiter" />
      <UiImage
        v-if="previewImageUrl"
        :src="previewImageUrl"
        sizes="300 xs:460 sm:748 md:1004"
        class="preview-image"
      />

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="content" v-html="replaceImgWithPicture(content || '')" />
  </article>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

definePageMeta({
  layout: 'articles'
})

const { $api } = useNuxtApp()
const route = useRoute()
const { replaceImgWithPicture } = useImgToPicture()

const { data: articleData, error } = await useAsyncData(
  'articles',
  () => $api.articles.getPublicArticle(route.params.slug as string)
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Не удалось загрузить статью'
  })
}

const { name = '', createdAt, previewImageUrl, content, title, description, keywords } = articleData.value || {}
const breadcrumbs = [
  { name: 'Главная', link: 'index' },
  { name: 'Статьи', link: 'articles' },
  { name }
]

useHead({
  title: title || name,
  meta: [
    { name: 'description', content: description || '' },
    { name: 'keywords', content: keywords || '' }
  ]
})
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  max-width: $content-block-max-width;
  margin: 0 auto;
  padding: $content-block-padding;
  box-sizing: border-box;

  .title {
    text-align: center;
  }

  .created-date {
    margin: 0 0 10px 0;
    color: $font-color-light;
    font-size: 14px;
    text-align: center;
  }

  .preview-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 0 auto;
    margin-bottom: 40px;
    display: block;
  }

  .breadcrumbs-wrapper {
    display: flex;
    justify-content: center;
  }

  .delimiter {
    width: 60px;
    height: 3px;
    border-radius: 10px;
    background-color: $primary-color;
    margin: 40px auto;
  }

  .content {
    :deep(blockquote) {
      display: block;
      position: relative;
      border-left: 3px solid $primary-color;
      padding: 20px 0 20px 30px;
      margin: 30px 0 30px 30px;
      font-size: 20px;
      font-style: italic;

      p {
        margin: 0;
      }

      &::before {
        content: '\e907';
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-family: icons;
        font-size: 20px;
        position: absolute;
        width: 50px;
        height: 50px;
        border: initial;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        color: $primary-color;
      }
    }

    :deep(.picture-wrapper) {
      max-width: 100% !important;
      height: auto !important;
      line-height: 0;

      img {
        width: 100%;
        line-height: 0;
      }
    }
  }
}
</style>
