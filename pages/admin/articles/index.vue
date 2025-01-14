<template>
  <CmsFeaturesTableListPage
    :headers="HEADERS"
    :items="articles"
    :footer-settings="footerSettings"
    class="articles-list"
    @page-change="changePage($event)"
  >
    <template #item-previewImageUrl="{ previewImageUrl }">
      <NuxtImg
        v-slot="{ src }"
        :src="previewImageUrl"
        format="webp"
        sizes="88px"
        custom
      >
      <img
        v-lazy="{ src }"
        alt="preview image"
        class="preview"
      />
      </NuxtImg>
    </template>

    <template #item-isActive="{ isActive }">
      <div :class="['status', { 'status_is-active': isActive }]">
        {{ isActive ? 'Включена' : 'Отключена' }}
      </div>
    </template>

    <template #item-actions="{ id }">
      <div class="status">
        <CmsUiTableActions
          :actions="[TABLE_ACTIONS.edit]"
          @edit-click="$router.push({ name: 'admin-articles-id-edit', params: { id } })"
        />
      </div>
    </template>

    <template #item-createdAt="{ createdAt }">
      {{ new Date(createdAt).toLocaleString() }}
    </template>
  </CmsFeaturesTableListPage>
</template>

<script setup lang="ts">
import CmsUiTableActions from '@/components/ui/cms/table/TableActions.vue'

import { TABLE_ACTIONS } from '@/shared/constants'

const HEADERS = [
  { text: 'Превью', value: 'previewImageUrl' },
  { text: 'Название', value: 'name' },
  { text: 'Дата создания', value: 'createdAt' },
  { text: 'Статус', value: 'isActive' },
  { text: '', value: 'actions' }
]

definePageMeta({
  layout: 'cms'
})

const { $api } = useNuxtApp()
const articles = ref<TArticleModel[]>([])
const router = useRouter()

const getList = (params: TPaginationData) => {
  return $api.articles.getList(params)
    .then(data => {
      articles.value = data.articles
      pagination.value = {
        page: data.page,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        perPage: data.perPage
      }
    })
}

const { pagination, changePage } = useTableList({
  loadFunction: getList as (params: unknown) => Promise<unknown>
})

const footerSettings = {
  submit: {
    text: 'Создать',
    type: 'button' as const,
    clickHandler: () => router.push({ name: 'admin-articles-new' })
  },
  pagination
}
</script>

<style lang="scss" scoped>
.articles-list {
  .preview {
    width: 88px;
    height: 50px;
    object-fit: cover;
    border-radius: $cms-border-radius;
    display: block;
  }

  .status {
    color: $cms-muted-color;

    &_is-active {
      color: $cms-success-color;
    }
  }
}
</style>
