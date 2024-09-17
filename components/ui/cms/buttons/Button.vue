<template>
  <button
    :type="type"
    v-bind="$attrs"
    :class="classes"
    @click="handleButtonClick"
  >
    <UiSpinner v-if="isLoading" />

    <div class="text">
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
export interface Props {
  type?: 'button' | 'submit' | 'reset',
  isLoading?: boolean
}

const BASE_CLASS = 'button'

const emit = defineEmits(['click'])

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  isLoading: false
})

const classes = computed(() => {
  return [
    BASE_CLASS,
    props.isLoading && `${BASE_CLASS}_is-loading`
  ]
})

const handleButtonClick = () => {
  if (props.isLoading) {
    return null
  }

  emit('click')
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  border-radius: $cms-border-radius;
  background: $primary-color;
  padding: 10px 25px;
  border: none;
  border: 1px solid $primary-color;
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease, border 0.3s ease;

  .spinner {
    position: absolute;
    height: 80%;
    top: 10%;
  }

  &:not(.button_is-loading, :disabled):hover {
    background: darken($primary-color, $amount: 5%);
    border-color: darken($primary-color, $amount: 5%);
  }

  &:not(.button_is-loading, :disabled):active {
    background: darken($primary-color, $amount: 10%);
    border-color: darken($primary-color, $amount: 10%);
  }

  .text {
    display: flex;
    align-items: center;
  }

  &_is-loading {
    cursor: default;
    .text {
      visibility: hidden;
    }
  }

  &:disabled {
    cursor: default;
    background: rgba($primary-color, 0.5);
  }
}
</style>
