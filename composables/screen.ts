import { useBreakpoints } from '@vueuse/core'
import { BREAKPOINTS } from '@/shared/constants'

export function useScreen() {
  const breakpoints = useBreakpoints(BREAKPOINTS)

  const isLgScreenSize = computed(() => {
    return breakpoints.greater('lg').value
  })

  const currentBreakpoint = computed(() => {
    return breakpoints.active().value
  })

  const isRetina = computed(() => {
    return window?.devicePixelRatio > 1 || false
  })

  return { breakpoints, isLgScreenSize, isRetina, currentBreakpoint }
}
