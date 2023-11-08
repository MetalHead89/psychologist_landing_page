export function useMetrika() {
  // const config = useRuntimeConfig()

  const metrika = (method: string, ...options: any) => {
    ym('95436575', method, ...options)
  }

  return { metrika }
}
