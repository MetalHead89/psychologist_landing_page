<template>
  <UiBaseModal v-bind="$attrs" class="modal-location-instruction">
    <template #window>
      <video controls playsinline class="video-player">
        <source
          src="@/assets/video/webm/location.webm"
          type="video/webm"
        />

        <source
          src="@/assets/video/mp4/location.mp4"
          type="video/mp4"
        />

        Видео не может быть воспроизведено в вашем браузере
      </video>
    </template>
  </UiBaseModal>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
</script>

<style lang="scss" scoped>
.modal-location-instruction {
  :deep(.window ) {
    width: 100%;
    max-width: $lg;
  }

  .video-player {
    max-height: 100vh;
    max-width: 100%;
    object-fit: contain;
  }
}
</style>
