<template>
  <div class="table-list-page">
    <CmsFeaturesPage ref="pageRef">
      <CmsUiDataTable
        :headers="headers"
        :items="items"
        v-bind="$attrs"
        :table-height="tableHeight"
      >
        <template
          v-for="slotName in Object.keys($slots)"
          #[slotName]="slotScope"
        >
          <slot :name="slotName" v-bind="slotScope" />
        </template>
      </CmsUiDataTable>
    </CmsFeaturesPage>

    <CmsFeaturesFormFooter
      v-if="isShowFooter"
      v-bind="footerSettings"
      @page-change="$emit('page-change', $event)"
    >
      <template
        v-for="slotName in Object.keys($slots)"
        #[slotName]="slotScope"
      >
        <slot :name="slotName" v-bind="slotScope" />
      </template>
    </CmsFeaturesFormFooter>
  </div>
</template>

<script setup lang="ts">
import CmsUiDataTable from '@/components/ui/cms/table/DataTable.vue'
import type { Header, Item } from 'vue3-easy-data-table'
import type { Props as IFooterSettings } from './FormFooter.vue'
import { useResizeObserver } from '@vueuse/core'
import CmsFeaturesPage from './Page.vue'

const MIN_TABLE_HEIGHT = 180

interface Props {
  headers: Header[],
  items: Item[],
  footerSettings?: IFooterSettings,
}

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => [],
  footerSettings: undefined
})

defineEmits(['page-change'])
const pageRef = ref<InstanceType<typeof CmsFeaturesPage> | null>(null)
const tableHeight = ref(0)

useResizeObserver(pageRef, async entries => {
  tableHeight.value = MIN_TABLE_HEIGHT
  await nextTick()
  const entry = entries[0]
  const pageContentWrapper: HTMLElement | null = entry.target.querySelector('.content-wrapper')
  tableHeight.value = pageContentWrapper?.offsetHeight || MIN_TABLE_HEIGHT
})

const isShowFooter = computed(() => {
  return props.footerSettings
})
</script>

<style lang="scss" scoped>
.table-list-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .page {
    flex-grow: 1;

    :deep(.content-wrapper) {
      padding: 0;

      .data-table {
        border: initial;
      }
    }
  }

  .form-footer {
    margin-bottom: 20px;
  }
}
</style>
