export default {
  feedback: {
    title: 'Оставить заявку',
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
      phone: '* Телефон'
    },
    submit: 'Отправить',
    errors: {
      cannot_be_empty: 'Не может быть пустым',
      invalid_number_format: 'Неверный формат числа',
      invalid_email_format: 'Неверный формат электронной почты',
      invalid_phone: 'Неверный телефон',
      unknown_server_error: 'Неизвестная ошибка сервера',
      problems_with_parameters: 'Проблемы с параметрами, проверьте правильность заполнения полей.'
    },
    snackbar: {
      success_title: 'Заявка отправлена',
      success_text: 'Я свяжусь с вами в ближайшее время'
    },
    selects: {
      anxiety: {
        relationship: 'Сложности в отношениях',
        relationship_with_yourself: 'Сложности в отношениях с собой',
        uncertainty: 'Неуверенность в себе',
        strange_emotions: 'Непонятные эмоции',
        loneliness: 'Чувство одиночества',
        plans: 'Карьера, финансы, планы на жизнь',
        loss_loved_one: 'Утрата близкого человека',
        loss_relationship: 'Утрата отношений'
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
      phone: 'Телефон'
    }
  }
}
