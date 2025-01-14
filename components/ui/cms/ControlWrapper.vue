<template>
  <div :class="wrapperClasses">
    <label
      v-if="label"
      class="label"
    >
      {{ label }}
    </label>

    <slot />

    <div class="error-wrapper">
      <Transition name="error">
        <div
          v-if="error"
          class="error"
        >
          {{ error }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  errorKey?: string
  isFullScreen?: boolean,
  label?: null | string
}

const errors = inject<Record<string, string | string[]>>('controlErrors', {})

const props = withDefaults(defineProps<Props>(), {
  errorKey: '',
  isFullScreen: false,
  label: null
})

const error = computed(() => {
  const errorsValue = errors.value as unknown as Record<string, string | string[]>
  const error = props.errorKey && errorsValue && errorsValue[props.errorKey]

  if (!error) {
    return false
  }

  return typeof error === 'object' ? error[0] : error
})

const wrapperClasses = computed(() => {
  return [
    'control-wrapper',
    props.isFullScreen && 'control-wrapper_is-full-screen'
  ]
})
</script>

<style lang="scss" scoped>
.control-wrapper {
  width: 100%;

  .label {
    display: block;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 5px;
  }

  @media screen and (min-width: $sm) {
    width: 400px;
  }

  &_is-full-screen {
    @media screen and (min-width: $sm) {
      width: 100%;
    }
  }
}

.error {
  margin-top: 5px;
  color: $error;
  font-size: 14px;
}

.error-enter-active,
.error-leave-active {
  transition: all 0.3s cubic-bezier(.57,1.75,.61,.65);
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>
