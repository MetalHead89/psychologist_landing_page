<template>
  <div class="articles-list">
    <div v-if="articles && articles.length === 0" class="stub-wrapper">
      <UiEmptyListStub class="list-stub"/>
    </div>

    <template v-else>
      <div class="breadcrumbs-wrapper">
        <UiBreadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" />
      </div>

      <div class="list">
        <UiArticleCard
          v-for="article in articles"
          :key="article.id"
          v-bind="article"
        />

        <InfiniteLoading v-if="hasMore" @infinite="loadArticles" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import InfiniteLoading from 'v3-infinite-loading'

definePageMeta({
  layout: 'articles'
})

const { $api } = useNuxtApp()
const page = ref(1)
const perPage = ref(25)
const breadcrumbs = [
  { name: 'Главная', link: 'index' },
  { name: 'Статьи' }
]

const { data: articlesData, error } = await useAsyncData(
  'articles',
  () => $api.articles.getPublicList({ page: page.value, perPage: perPage.value })
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Не удалось получить список статей'
  })
}

const articles = ref(articlesData.value?.articles || [])
page.value = articlesData.value?.page || 1
const totalPages = ref(articlesData.value?.totalPages || 1)

useHead({
  title: 'Статьи',
  meta: [
    { name: 'description', content: 'Список статей' }
  ]
})

const hasMore = computed(() => {
  return page.value < totalPages.value
})

const loadArticles = async () => {
  if (!hasMore.value) {
    return
  }

  const { articles: newArticles, totalPages: newTotalPages, page: newPage } =
    await $api.articles.getPublicList({ page: page.value + 1, perPage: perPage.value })
  articles.value = [...articles.value, ...newArticles]
  totalPages.value = newTotalPages
  page.value = newPage
}
</script>

<style src="v3-infinite-loading/lib/style.css"></style>

<style lang="scss" scoped>
.articles-list {
  max-width: $content-block-max-width;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: $content-block-padding;
  flex-grow: 1;

  .stub-wrapper {
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    row-gap: 70px;
  }

  .article-card {
    width: 100%;

    @media screen and (min-width: $sm) {
      width: calc(100% / 2 - 20px);
    }

    @media screen and (min-width: $md) {
      width: calc(100% / 3 - 20px);
    }
  }

  :deep(.v3-infinite-loading) {
    height: 54px;
    margin-bottom: 20px;

    & > div {
      display: flex;
      justify-content: center;
    }

    .spinner {
      width: 50px;
      height: 50px;
    }
  }

  .breadcrumbs-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
}
</style>
