export const useHeaderStore = defineStore('header', () => {
  const DEFAULT_HEADER_HEIGHT = '63px'

  const headerHeight = ref(DEFAULT_HEADER_HEIGHT)

  const setHeaderHeight = (value: number) => {
    headerHeight.value = `${value}px`
  }

  return { headerHeight, setHeaderHeight }
})
