export default {
  feedback: {
    title: 'Оставить заявку',
    fields: {
      name: '* Имя',
      mail: '* e-mail',
      description: '* Причина обращения'
    },
    submit: 'Отправить',
    errors: {
      cannot_be_empty: 'Не может быть пустым',
      invalid_email_format: 'Не верный формат электронной почты',
      unknown_server_error: 'Неизвестная ошибка сервера',
      problems_with_parameters: 'Проблемы с параметрами, проверьте правильность заполнения полей.'
    },
    snackbar: {
      success_title: 'Заявка отправлена',
      success_text: 'Я свяжусь с вами в ближайшее время'
    },
    mail: {
      subject: 'Запись на прием',
      client: 'Клиент',
      mail: 'Почта',
      appeal_reason: 'Причина обращения'
    }
  }
}
