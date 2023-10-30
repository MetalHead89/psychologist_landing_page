<template>
  <UiSelect
    v-bind="$attrs"
    :model-value="modelValue"
    :options="options"
    :close-on-select="false"
    is-multiple
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #tag>
      <span />
    </template>

    <template #selection="{ isOpen, values }">
      <div
        v-if="!isOpen && values && values.length > 0"
      >
        {{ values.map(item => item[showBy]).join(', ') }}
      </div>
    </template>
  </UiSelect>
</template>

<script setup lang="ts">

export interface Props {
  modelValue: string | string[],
  options: TAnyObject[],
  showBy?: string,
}

defineOptions({
  inheritAttrs: false
})

defineEmits([
  'update:model-value'
])

withDefaults(defineProps<Props>(), {
  showBy: 'title'
})
</script>
