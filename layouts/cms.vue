<template>
  <div class="cms">
    <CmsFeaturesHeader />
    <CmsFeaturesSidebar />
    <div
      v-if="isInitialized"
      ref="main"
      :class="mainClasses"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const main = ref<HTMLElement | null>(null)

const headerStore = useHeaderStore()
const { headerHeight } = storeToRefs(headerStore)
const userStore = useUserStore()
const sidebarStore = useSidebarStore()
const { $api } = useNuxtApp()
const isInitialized = ref(false)

const mainClasses = computed(() => {
  return [
    'main',
    !sidebarStore.isFullShow && 'main_is-full'
  ]
})

onBeforeMount(() => {
  getInitData()
})

onMounted(() => {
  if (main.value) {
    main.value.style.paddingTop = headerHeight.value
  }
})


watch(headerHeight, value  => {
  if (!value || !main.value) {
    return
  }

  main.value.style.paddingTop = value
})

const getInitData = async () => {
  try {
    userStore.setUser(await $api.profile.get())
    isInitialized.value = true
  } catch {
    console.error('Error while initializing cms')
    isInitialized.value = true
  }
}
</script>

<style lang="scss" scoped>
.cms {
  display: flex;
  flex-direction: column;
  background: #f8f8fa;
  min-height: 100%;
  font-size: $cms-font-size;
  font-weight: 400;
  line-height: $cms-line-height;

  .main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-top: 72px;
    padding-left: 0;
    height: 100%;
    transition: padding 0.3s ease;

    @media screen and (min-width: $lg) {
      padding-left: $cms-sidebar-max-width;
    }

    &_is-full {
      padding-left: 0;

      @media screen and (min-width: $lg) {
        padding-left: $cms-sidebar-min-width;
      }
    }
  }
}
</style>
