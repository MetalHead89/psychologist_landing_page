export const useLoadingOverlayStore = defineStore('loadingOverlay', () => {

  const isShow = ref(false)

  const setIsShow = (value: boolean) => {
    isShow.value = value
  }

  return { isShow, setIsShow }
})
