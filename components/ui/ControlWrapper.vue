<template>
  <div class="control-wrapper">
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

<script setup>
import { inject } from 'vue'

const errors = inject('errors', {})

const props = defineProps({
  errorKey: {
    type: String,
    default: ''
  }
})

const error = computed(() => {
  const error = props.errorKey && errors.value && errors.value[props.errorKey]

  if (!error) {
    return false
  }

  return typeof error === 'object' ? error[0] : error
})
</script>

<style lang="scss" scoped>
.control-wrapper {
  width: 100%
}

.error-wrapper {
  margin-top: 5px;
  margin-left: 13px;
  margin-bottom: 10px;
  min-height: 17px;
}

.error {
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
