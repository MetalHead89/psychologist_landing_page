export function useOptions() {
  const { t } = useI18n()

  const getOptions = (keys: string[], translatePath: string) => {
    return keys.map(key => ({ id: key, title: t(`${translatePath}.${key}`) }))
  }

  return { getOptions }
}
