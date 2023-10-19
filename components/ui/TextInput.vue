<template>
  <UiControlWrapper :error-key="errorKey">
    <input
      type="text"
      v-bind="$attrs"
      class="text-input"
      :value="modelValue"
      @input="handleTextInput"
    >
  </UiControlWrapper>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

defineProps({
  modelValue: {
    type: String,
    default: ''
  },

  errorKey: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const handleTextInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
.text-input {
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #f4f7f9;
  padding: 20px;
  box-sizing: border-box;
  transition: all .2s ease-in;
  outline: 2px solid transparent;

  &:hover,
  &:active,
  &:focus {
    outline: 2px solid $primary-color;
  }
}
</style>
