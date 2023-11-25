// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
    '@nuxt/image',
    '@nuxtjs/i18n',
    'floating-vue/nuxt',
    'nuxt-snackbar',
    'nuxt-simple-sitemap',
    '@nuxtjs/robots'
  ],

  image: {
    quality: 50,
    format: ['avif', 'webp', 'jpg', 'svg'],
    domains: ['psycholog-bakalova.ru']
  },

  site: {
    url: 'https://psycholog-bakalova.ru'
  },

  sitemap: {
    autoI18n: false
  },

  snackbar: {
    bottom: true,
    duration: 5000
  },

  runtimeConfig: {
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    contactMail: process.env.CONTACT_MAIL,
    notifierBotToken: process.env.NOTIFIER_BOT_TOKEN,
    psychologyTelegramChatId: process.env.PSYCHOLOGY_TELEGRAM_CHAT_ID,

    public: {
      metrikaId: process.env.METRIKA_ID,
      gTagId: process.env.G_TAG_ID,
      yandexVerificationId: process.env.YANDEX_VERIFICATION_ID
    }
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
