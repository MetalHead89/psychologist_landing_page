<template>
  <div ref="headerWrapper" :class="classes">
    <header class="header">
      <CmsUiBurger />
      <CmsUiProfile class="profile"/>
    </header>
  </div>
</template>

<script lang="ts" setup>
const headerStore = useHeaderStore()
const headerWrapper = ref<HTMLElement | null>(null)
const sidebarStore = useSidebarStore()

const classes = computed(() => {
  return [
    'header-wrapper',
    !sidebarStore.isFullShow && 'header-wrapper_is-full'
  ]
})

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
  transition: left 0.3s ease;

  @media screen and (min-width: $lg) {
    left: $cms-sidebar-max-width;
  }

  &_is-full {
    left: 0;

    @media screen and (min-width: $lg) {
      left: $cms-sidebar-min-width;
    }
  }

  .header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 7px $cms-horizontal-padding;
    box-shadow: $cms-base-shadow;
    border-radius: $cms-border-radius;
    background: #ffffff;
  }

  .profile {
    margin-left: auto;
  }
}
</style>
