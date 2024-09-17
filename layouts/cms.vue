<template>
  <div class="cms">
    <CmsFeaturesHeader />
    <div
      v-if="isInitialized"
      ref="main"
      class="main"
    >
      <slot />
    </div>
    <NuxtSnackbar />
  </div>
</template>

<script lang="ts" setup>
const main = ref<HTMLElement | null>(null)

const headerStore = useHeaderStore()
const { headerHeight } = storeToRefs(headerStore)
const userStore = useUserStore()
const { $api } = useNuxtApp()
const isInitialized = ref(false)

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
    height: 100%;
  }
}
</style>
