<template>
  <Vue3EasyDataTable
    class="data-table"
    :headers="headers"
    :items="items"
    alternating
    hide-footer
    empty-message="Нет данных для отображения"
  >
  <template
    v-for="slotName in Object.keys($slots)"
    #[slotName]="slotScope"
  >
    <slot :name="slotName" v-bind="slotScope" />
  </template>
  </Vue3EasyDataTable>
</template>

<script lang="ts" setup>
import Vue3EasyDataTable from 'vue3-easy-data-table'
import type { Header, Item } from 'vue3-easy-data-table'

interface Props {
  headers: Header[],
  items: Item[]
}

withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => []
})
</script>

<style src="vue3-easy-data-table/dist/style.css"></style>
<style lang="scss">
  .data-table.vue3-easy-data-table {
    --easy-table-body-item-padding: 10px;

    border-radius: $cms-border-radius;

    .vue3-easy-data-table__main {
      border-radius: $cms-border-radius;
    }
  }
</style>
