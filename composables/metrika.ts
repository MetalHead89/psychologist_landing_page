export function useMetrika() {
  const config = useRuntimeConfig()

  const metrika = (method: string, ...options: any) => {
    ym(config.public.metrikaId, method, ...options)
  }

  return { metrika }
}
