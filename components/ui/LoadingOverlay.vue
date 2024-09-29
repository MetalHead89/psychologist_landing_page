<template>
  <Transition name="loading-overlay-fade">
    <div v-if="loadingOverlay.isShow" class="loading-overlay">
      <UiSpinner />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const loadingOverlay = useLoadingOverlayStore()
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #00000062;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  .spinner {
    max-width: 150px;
  }
}

.loading-overlay-fade-enter-active,
.loading-overlay-fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.loading-overlay-fade-enter-from,
.loading-overlay-fade-leave-to {
  opacity: 0;
}
</style>
