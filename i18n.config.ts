import ru from './locales/ru/common'

export default defineI18nConfig(() => ({
  legacy: false,
  availableLocales: ['ru'],
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru
  }
}))
