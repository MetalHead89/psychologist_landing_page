<template>
  <textarea
    v-bind="$attrs"
    class="textarea"
    :value="modelValue"
    @input="handleTextInput"
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

const emit = defineEmits(['update:model-value'])

const handleTextInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:model-value', target.value)
}
</script>

<style lang="scss" scoped>
.textarea {
  width: 100%;
  border: none;
  border-radius: $cms-border-radius;
  background: $primary-background;
  padding: $cms-control-padding;
  box-sizing: border-box;
  transition: outline .2s ease-in;
  outline: 1px solid transparent;
  font-size: $cms-font-size;
  line-height: $cms-line-height;
  resize: vertical;
  min-height: 80px;

  &::placeholder {
    color: $placeholder-color;
  }

  &:hover,
  &:active,
  &:focus {
    outline: 1px solid $primary-color;
  }
}
</style>
