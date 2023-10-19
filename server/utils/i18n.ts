import { createI18n } from 'vue-i18n'

import ru from '@/locales/ru/common'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  messages: {
    ru
  }
})

export const { t, locale } = i18n.global
