export function useAssetImage(path: string) {
  const assets = import.meta.glob('~/assets/images/**/*', {
    eager: true,
    import: 'default'
  })

  return (assets['/assets' + path] || '') as string
}
