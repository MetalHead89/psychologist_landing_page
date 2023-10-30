<template>
  <UiTextInput
    v-bind="$attrs"
    :model-value="modelValue"
    mask="+7 (###) ### ##-##"
    @update:model-value="$emit('update:model-value', $event)"
  />
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: string
}

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<Props>(), {})

defineEmits(['update:model-value'])
</script>

<style lang="scss" scoped>
.text-input {
  width: 100%;
  border: none;
  border-radius: $base-border-radius;
  background: $primary-background;
  padding: $control-padding;
  box-sizing: border-box;
  transition: all .2s ease-in;
  outline: 2px solid transparent;
  line-height: $base-line-height;

  &::placeholder {
    color: $placeholder-color;
  }

  &:hover,
  &:active,
  &:focus {
    outline: 2px solid $primary-color;
  }
}
</style>
