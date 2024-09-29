<template>
  <div class="feedback-filters">
    <CmsUiRadioGroup
      v-bind="$attrs"
      :options="options"
    >
      <template #option="{ id, name, isActive }">
        <div :class="getFilterClasses(id, isActive)">
          {{ name }}
        </div>
      </template>
    </CmsUiRadioGroup>
  </div>
</template>

<script lang="ts" setup>
import { FEEDBACK_FILTERS } from '@/shared/constants'

const options = [
  { id: FEEDBACK_FILTERS.all, name: 'Все' },
  { id: FEEDBACK_FILTERS.forModeration, name: 'На модерации' },
  { id: FEEDBACK_FILTERS.approved, name: 'Отображаются' },
  { id: FEEDBACK_FILTERS.rejected, name: 'Скрыты' }
]

defineOptions({
  inheritAttrs: false
})

const getFilterClasses = (id: string, isActive: boolean) => {
  return [
    'filter-item',
    `filter-item_${id}`,
    isActive && 'filter-item_is-active'
  ]
}
</script>

<style lang="scss" scoped>
.feedback-filters {
  .filter-item {
    border-radius: $base-border-radius;
    padding: 5px 10px;
    background: rgba($primary-color, 0.2);
    border: 1px solid transparent;
    cursor: pointer;

    &_is-active {
      border-color: $primary-color;
    }

    &_forModeration {
      background: #ffd76012;

      &.filter-item_is-active {
        border-color: #ffd760;
      }
    }

    &_approved {
      background: #66a33d12;

      &.filter-item_is-active {
        border-color: #66a33d;
      }
    }

    &_rejected {
      background: #6e6e6e12;

      &.filter-item_is-active {
        border-color: #6e6e6e;
      }
    }
  }
}
</style>
