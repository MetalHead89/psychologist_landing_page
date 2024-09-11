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
    { path: '~/components/ui/modals', prefix: 'Ui' },
    { path: '~/components/features/cms', prefix: 'CmsFeatures' },
    { path: '~/components/ui/cms', prefix: 'CmsUi' },
    '~/components'
  ],

  modules: [
    '@nuxtjs/i18n',
    'floating-vue/nuxt',
    'nuxt-snackbar',
    '@nuxtjs/robots',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    'nuxt-mongoose'
  ],

  mongoose: {
    uri: process.env.MONGODB_URI,
    options: { dbName: process.env.MONGODB_DB_NAME },
    modelsDir: 'models',
    devtools: true
  },

  i18n: {
    vueI18n: './i18n.config.ts'
  },

  site: {
    url: 'https://psycholog-bakalova.ru'
  },

  robots: {
    autoI18n: false,
    disallow: ['/privacy']
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
    accessTokenSalt: process.env.ACCESS_TOKEN_SALT,
    refreshTokenSalt: process.env.REFRESH_TOKEN_SALT,

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
  },

  compatibilityDate: '2024-09-01'
})