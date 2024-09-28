declare module '#app' {
  interface NuxtApp {
    $api: IApi
    $fetchService: IFetchService
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: IApi
    $fetchService: IFetchService
  }
}

export {}
