<template>
  <UiModal ref="modal" class="image-viewer-modal">
    <div class="image-viewer">
      <img :src="image" class="image"/>
    </div>
  </UiModal>
</template>

<script lang="ts" setup>
import UiModal from '@/components/ui/modals/Modal.vue'

interface IProps {
  image: string
}

defineProps<IProps>()

const modal = ref<typeof UiModal | null>(null)
</script>

<style lang="scss" scoped>
.image-viewer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}
</style>

<style lang="scss">
.image-viewer-modal {
  .modal {
    height: 90%;
    width: 90%;
    max-height: 90%;

    .content-wrapper {
      width: 100%;
      height: 100%;
      max-height: 100%;
      max-width: 100%;
      background: transparent;
      padding: 0;
    }

    .close-button {
      background: #ffffff;
      border-radius: 100%;
      padding: 5px;
    }
  }
}
</style>
