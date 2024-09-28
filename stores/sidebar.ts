export const useSidebarStore = defineStore('sidebar', () => {
  const isFullShow = ref(false)

  const setSidebarShowState = (value: boolean) => {
    isFullShow.value = value
  }

  const toggleSidebarShowState = () => {
    isFullShow.value = !isFullShow.value
  }

  return { isFullShow, setSidebarShowState, toggleSidebarShowState }
})
