<template>
  <div ref="headerWrapper" class="header-wrapper">
    <header :class="classes">
      <CmsUiBurger />
      <CmsUiProfile class="profile"/>
    </header>
  </div>
</template>

<script lang="ts" setup>
const headerStore = useHeaderStore()
const headerWrapper = ref<HTMLElement | null>(null)
// const sidebarStore = useSidebarStore()
// const screen = useScreen()

const BASE_CLASS = 'header'

const classes = computed(() => {
  return [
    BASE_CLASS
    // !screen.isMobileScreen.value && sidebarStore.isMinimized && `${BASE_CLASS}_is-long`,
    // !screen.isMobileScreen.value && sidebarStore.isOpened && `${BASE_CLASS}_is-short`
  ]
})

// defineOptions({
//   inheritAttrs: false
// })

const handleHeaderResize = () => {
  if (!headerWrapper.value) {
    return
  }

  headerStore.setHeaderHeight(headerWrapper.value.offsetHeight)
}

let resizeObserver: ResizeObserver | null = null

if (import.meta.browser) {
  resizeObserver = new ResizeObserver(handleHeaderResize)
}

onMounted(() => {
  if (headerWrapper.value && resizeObserver) {
    resizeObserver.observe(headerWrapper.value)
  }
})

onDeactivated(() => {
  if (headerWrapper.value && resizeObserver) {
    resizeObserver.unobserve(headerWrapper.value)
  }
})
</script>

<style lang="scss" scoped>
.header-wrapper {
  padding: 16px $cms-horizontal-padding 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(248, 247, 250, 0.7) 44%, rgba(248, 247, 250, 0.43) 73%, rgba(248, 247, 250, 0));
  backdrop-filter: saturate(200%) blur(10px);
  z-index: 100;

  .header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 7px $cms-horizontal-padding;
    box-shadow: $cms-base-shadow;
    border-radius: $cms-border-radius;
    background: #ffffff;
    // grid-column: 1 / span 2;
    // padding: 20px $base-content-padding;
    // display: flex;
    // align-items: center;
    // background: rgba($main-bg-color, 0.7);
    // transition: margin 0.3s;
    // gap: 30px;

    // &_is-long {
    //   margin-left: $sidebar-minimized-width;
    // }

    // &_is-short {
    //   margin-left: $sidebar-max-width;
    // }
  }

  .profile {
    margin-left: auto;
  }
}
</style>