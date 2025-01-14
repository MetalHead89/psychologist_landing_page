import VueLazyLoad from 'vue3-lazyload'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueLazyLoad, {
    loading: '/images/image_placeholder_16x9.svg',
    error: '/images/image_placeholder_16x9.svg'
  })
})
