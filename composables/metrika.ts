export function useMetrika() {
  const config = useRuntimeConfig()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metrika = (method: string, ...options: any) => {
    if (process.env.NODE_ENV === 'production') {
      ym(config.public.metrikaId, method, ...options)
    }
  }

  return { metrika }
}
