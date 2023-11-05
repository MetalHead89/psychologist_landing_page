// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  site: {
    url: 'https://psycholog-bakalova.ru'
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      }
    }
  },

  components: [
    { path: '~/components/features', prefix: 'Features' },
    '~/components'
  ],

  modules: [
    '@nuxtjs/i18n',
    'floating-vue/nuxt',
    'nuxt-snackbar',
    'nuxt-simple-sitemap'
  ],

  snackbar: {
    bottom: true,
    duration: 5000
  },

  runtimeConfig: {
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    contactMail: process.env.CONTACT_MAIL
  },

  css: ['@/assets/styles/global.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/styles/variables.scss" as *;'
        }
      }
    }
  }
})
