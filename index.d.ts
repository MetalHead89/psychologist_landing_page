import type TTinymce from 'tinymce/tinymce'

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

declare global {
  interface Window {
    tinymce?: TTinymce
  }
}

export {}
