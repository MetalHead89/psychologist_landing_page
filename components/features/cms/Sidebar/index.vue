<template>
  <aside :class="sidebarClasses">
    <div class="overlay" @click="handleOverlayClick" />

    <div class="sidebar-panel">
      <div ref="sidebarHeader" class="sidebar-header">
        <div class="title">
          CMS
        </div>

        <UiCloseButton class="close-button" @click="handleCloseClick" />
      </div>

      <CmsFeaturesNavigation />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import CmsFeaturesNavigation from './Navigation.vue'

const sidebarHeader = ref<HTMLElement | null>(null)

const sidebarStore = useSidebarStore()
const headerStore = useHeaderStore()
const { headerHeight } = storeToRefs(headerStore)
const { isLgScreenSize } = useScreen()

const sidebarClasses = computed(() => {
  return [
    'sidebar',
    sidebarStore.isFullShow && 'sidebar_is-full'
  ]
})

onMounted(() => {
  sidebarStore.setSidebarShowState(isLgScreenSize.value)
})

watch(headerHeight, value  => {
  if (!value || !sidebarHeader.value) {
    return
  }

  sidebarHeader.value.style.height = value
})

const handleCloseClick = () => {
  sidebarStore.setSidebarShowState(false)
}

const handleOverlayClick = () => {
  sidebarStore.setSidebarShowState(false)
}
</script>

<style lang="scss" scoped>
.sidebar {
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0000003b;
    z-index: 200;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;

    @media screen and (min-width: $lg) {
      display: none;
    }
  }

  .sidebar-panel {
    position: fixed;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease, width 0.3s ease;
    z-index: 200;

    @media screen and (min-width: $xs) {
      max-width: $cms-sidebar-max-width;
    }

    @media screen and (min-width: $lg) {
      transform: initial;
      width: $cms-sidebar-min-width;
      box-shadow: $cms-base-shadow;
    }
  }

  .sidebar-header {
    position: relative;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    justify-content: space-between;
    flex-shrink: 0;
    padding: 15px 24px 0 24px;
    transition: padding 0.3s ease;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
      width: 100%;
      height: 15px;
      background: linear-gradient(0deg, #ffffff00 0%, #ffffff 100%);
      z-index: 1;
    }

    @media screen and (min-width: $lg) {
      padding-left: 14px;
    }
  }

  .close-button {
    @media screen and (min-width: $lg) {
      display: none;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 600;
  }

  &_is-full {
    .sidebar-header {
      @media screen and (min-width: $lg) {
        padding-left: 24px;
      }
    }

    .sidebar-panel {
      transform: translateX(0);

      @media screen and (min-width: $lg) {
        transform: initial;
        width: $cms-sidebar-max-width;
      }
    }

    .overlay {
      pointer-events: all;
      opacity: 1;
    }
  }
}
</style>
