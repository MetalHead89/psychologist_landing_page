<template>
  <input
    v-maska
    type="text"
    v-bind="$attrs"
    class="text-input"
    :value="modelValue"
    :data-maska="mask"
    @input="handleTextInput"
  />
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: string,
  errorKey?: string,
  mask?: string
}

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<Props>(), {
  errorKey: '',
  mask: ''
})

const emit = defineEmits(['update:model-value'])

const handleTextInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:model-value', target.value)
}
</script>

<style lang="scss" scoped>
.text-input {
  width: 100%;
  border: none;
  border-radius: $cms-border-radius;
  background: $primary-background;
  padding: $cms-control-padding;
  box-sizing: border-box;
  transition: all .2s ease-in;
  outline: 1px solid transparent;
  font-size: $cms-font-size;
  line-height: $cms-line-height;

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
