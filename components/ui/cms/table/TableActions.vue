<template>
  <div class="actions">
    <button
      v-if="actions.includes(TABLE_ACTIONS.edit)"
      class="action-button"
      @click="$emit('edit-click')"
    >
      <i class="ic-pencil" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { TABLE_ACTIONS } from '@/shared/constants'

interface Props {
  actions: TABLE_ACTIONS[]
}

defineProps<Props>()
defineEmits(['edit-click'])
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  gap: 10px;
  justify-content: end;

  .action-button {
    background: initial;
    border: initial;
    padding: 0;
    cursor: pointer;
    font-size: 15px;
    color: #8b8282;
    transition: $cms-base-hover-transition;

    &:hover {
      color: $cms-text-color;
    }
  }
}
</style>
