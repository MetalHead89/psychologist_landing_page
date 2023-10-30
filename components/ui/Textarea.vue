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
  border-radius: $base-border-radius;
  background: $primary-background;
  padding: $control-padding;
  box-sizing: border-box;
  resize: vertical;
  min-height: 200px;
  line-height: $base-line-height;

  transition: outline .2s ease-in;
  outline: 2px solid transparent;

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
