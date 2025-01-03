import { useBreakpoints } from '@vueuse/core'

export function useScreen() {
  const breakpoints = useBreakpoints({
    xs: 320,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1920
  })

  const isLgScreenSize = computed(() => {
    return breakpoints.greater('lg').value
  })

  return { breakpoints, isLgScreenSize }
}
