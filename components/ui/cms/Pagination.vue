<template>
  <div class="pagination">
    <vue-awesome-paginate
      :total-items="totalItems"
      :model-value="currentPage"
      :items-per-page="itemsPerPage"
      :max-pages-shown="maxPagesShown"
      :hide-prev-next-when-ends="true"
      @update:model-value="$emit('page-change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
  maxPagesShown?: number
}

withDefaults(defineProps<IProps>(), {
  maxPagesShown: 6
})

defineEmits(['page-change'])
</script>

<style src="vue-awesome-paginate/dist/style.css"></style>
<style lang="scss">
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 35px;
  width: 35px;
  border-radius: $cms-border-radius;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: initial;
  color: black;
  transition: $cms-base-hover-transition;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: $primary-color;
  cursor: default;
  color: white;
}

.active-page:hover {
  background-color: $primary-color;
}
</style>
