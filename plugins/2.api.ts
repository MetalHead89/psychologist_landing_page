import type { NuxtApp } from '#app'

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const lowercaseFirstLetter = (string: string) =>
  string.charAt(0).toLowerCase() + string.slice(1)

const capitalizeArray = (arr: string[]) => arr.map(key => capitalizeFirstLetter(key))

export default defineNuxtPlugin(async nuxtApp => {
  const api: IApi | object = {}
  const files = import.meta.glob('@/api/*.ts')

  for (const file in files) {
    if (typeof file !== 'string') {
      return
    }

    const key = lowercaseFirstLetter(
      capitalizeArray(
        file
          .split('/')
          .pop()
          ?.replace('.ts', '')
          .split('_') || []
      ).join('')
    ) as keyof IApi

    const module = await files[file]() as { default: (nuxtApp: NuxtApp) => IApi[typeof key] }

    if (module) {
      (api as IApi)[key] = module.default(nuxtApp as NuxtApp)
    }
  }

  await nuxtApp.provide('api', api)
})
