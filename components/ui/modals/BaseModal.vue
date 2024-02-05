<template>
  <div class="modal-wrapper">
    <Transition name="overlay-fade">
      <div v-if="isShow" class="overlay" @click="handleCloseClick" />
    </Transition>

    <Transition name="close-fade">
      <button v-if="isShow" class="close" @click="handleCloseClick">
        <div class="ic-close" />
      </button>
    </Transition>

    <Transition name="window-fade">
      <div v-if="isShow" ref="modalWindowRef" class="window">
        <slot name="window" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  isShow?: boolean
}

withDefaults(defineProps<Props>(), {
  isShow: false
})

const modalWindowRef = ref<HTMLDivElement | null>(null)

const emit = defineEmits(['update:is-show'])

const handleCloseClick = () => {
  emit('update:is-show', false)
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  z-index: 200;

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000000b9;
    cursor: pointer;
  }

  .close {
      padding: 0;
      margin: 0;
      display: flex;
      color: #ffffff;
      background: none;
      border: none;
      cursor: pointer;
      position: fixed;
      top: 20px;
      right: 20px;
      font-size: 30px;
      z-index: 1;
    }

  .window {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay-fade-enter-active,
  .overlay-fade-leave-active,
  .close-fade-enter-active,
  .close-fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .overlay-fade-enter-from,
  .overlay-fade-leave-to,
  .close-fade-enter-from,
  .close-fade-leave-to {
    opacity: 0;
  }

  .window-fade-enter-active,
  .window-fade-leave-active {
    transition: all 0.3s ease;
  }

  .window-fade-enter-from,
  .window-fade-leave-to {
    transform: translate(-50%, -50%) scale(0);
  }
}
</style>
