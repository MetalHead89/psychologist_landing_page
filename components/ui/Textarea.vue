<template>
  <UiControlWrapper :error-key="errorKey">
    <textarea
      type="text"
      v-bind="$attrs"
      class="textarea"
      :value="modelValue"
      @input="handleTextInput"
    />
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
.textarea {
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #f4f7f9;
  padding: 20px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 200px;

  transition: outline .2s ease-in;
  outline: 2px solid transparent;

  &:hover,
  &:active,
  &:focus {
    outline: 2px solid $primary-color;
  }
}
</style>
