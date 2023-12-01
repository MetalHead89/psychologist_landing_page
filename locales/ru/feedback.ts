export default {
  feedback: {
    title: 'Оставьте заявку и я свяжусь с вами',
    phone_title: 'Или запишитесь по телефону: {phone}',
    about_you: 'О себе',
    how_to_contact_you: 'Как с вами связаться?',
    reason: 'Причина обращения',
    fields: {
      name: '* Имя',
      age: '* Возраст (лет)',
      anxiety: '* Что вас беспокоит?',
      anxiety_description: 'Краткое описание проблемы',
      answer_target: '* Куда удобнее вам написать?',
      mail: '* E-mail',
      phone: '* Телефон',
      consent_processing: 'Я ознакомлен(-на) с {privacy} и согласен(-на) на обработку персональных данных.',
      privacy: 'Политикой конфиденциальности'
    },
    submit: 'Отправить',
    errors: {
      cannot_be_empty: 'Не может быть пустым',
      invalid_number_format: 'Неверный формат числа',
      invalid_email_format: 'Неверный формат электронной почты',
      invalid_phone: 'Неверный телефон',
      unknown_server_error: 'Неизвестная ошибка сервера',
      problems_with_parameters: 'Проблемы с параметрами, проверьте правильность заполнения полей.',
      consent_processing_cannot_be_false: 'Подтвердите согласие на обработку персональных данных'
    },
    snackbar: {
      success_title: 'Заявка отправлена',
      success_text: 'Я свяжусь с вами в ближайшее время'
    },
    selects: {
      anxiety: {
        relationship: 'Трудности в отношениях с родителями, партнером',
        public_speaking_fear: 'Страх публичных выступлений',
        emotional_burnout: 'Эмоциональное выгорание',
        losing_interest: 'Потеря интереса ко всему, что нравилось раньше',
        loss_loved_one: 'Утрата близкого человека',
        professional_problems: 'Профессиональные проблемы: поиск новой работы; проблемы с коллегами',
        intrusive_thoughts: 'Навязчивые мысли о себе, страхи',
        mood_swings: 'Постоянные скачки настроения',
        underestimated: 'Заниженная оценка собственных возможностей, неверие в свои силы',
        decline_performance: 'Хождение в школу через силу, общее снижение успеваемости',
        socialization: 'Проблемы с социализацией, налаживанием дружеских контактов',
        desire_harm_yourself: 'Стремление навредить своему телу',
        despair: 'Отчаяние, разговоры о смерти, бессмысленности существования'
      },
      feedback_type: {
        telegram: 'Telegram',
        viber: 'Viber',
        whats_app: 'WhatsApp',
        email: 'E-mail'
      }
    },
    mail: {
      subject: 'Запись на прием',
      client: 'Клиент',
      mail: 'Почта',
      age: 'Возраст',
      anxiety: 'Беспокоит',
      anxiety_description: 'Описание проблемы',
      answer_target: 'Связь через',
      appeal_reason: 'Причина обращения',
      phone: 'Телефон',
      new_appointment: 'Новая запись на консультацию!'
    }
  }
}
