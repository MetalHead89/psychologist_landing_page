<template>
  <VueFinalModal
    :modal-id="modalId"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="modal">
      <div class="content-wrapper">
        <slot />

        <UiCloseButton class="close-button" @click="handleCloseClick" />
      </div>
    </div>
  </VueFinalModal>
</template>

<script lang="ts" setup>
import { VueFinalModal, useVfm } from 'vue-final-modal'

const modalId = 'feedbackModal'
const vfm = useVfm()

const handleCloseClick = () => {
  close()
}

const close = () => {
  vfm.close(modalId)
}

defineExpose({
  close
})
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;

  @media screen and (min-width: $sm) {
    max-height: 90vh;
    max-height: 90svh;
    width: clamp(0px, 90%, 700px);
    border-radius: $base-border-radius;
  }

  .content-wrapper {
    background: #ffffff;
    padding: 40px 30px;
    position: relative;
    overflow-y: auto;
    height: 100%;
    width: 100%;

    @media screen and (min-width: $sm) {
      max-height: 90vh;
      max-height: 90svh;
      max-width: 700px;
      border-radius: $base-border-radius;
    }

    .close-button {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
