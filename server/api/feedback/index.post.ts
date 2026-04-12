const generateMessage = (name: string, rating: number, feedback: string) => {
  return '<b>Новый отзыв на модерации!</b> 💬\n' +
    `<b>От:</b> ${name}\n` +
    `<b>Оценка:</b> ${'⭐'.repeat(rating)}\n` +
    `<b>Отзыв:</b> ${feedback}`
}

export default defineEventHandler(async event => {
  try {
    const { name, rating, feedback } = await readBody(event)
    const snackbarErrors = []
    const fieldErrors: { [prop: string]: string } = {}

    if (!name.trim()) {
      snackbarErrors.push('Не заполнено обязательное поле "Имя"')
      fieldErrors.name = 'Не может быть пустым'
    }

    if (!rating) {
      snackbarErrors.push('Не указана оценка услуги')
      fieldErrors.retryPassword = 'Оцените услугу'
    }

    if (!feedback) {
      snackbarErrors.push('Не заполнено поле "Отзыв"')
      fieldErrors.retryPassword = 'Не может быть пустым'
    }

    if (snackbarErrors.length > 0 || Object.keys(fieldErrors).length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Required fields are not filled in',
        data: {
          snackbarErrors,
          fieldErrors
        }
      })
    }

    await FeedbackSchema.create({ name, rating, feedback })

    // sendTelegramNotification(generateMessage(name, rating, feedback))
    sendVkNotification(generateMessage(name, rating, feedback))

    return { success: true }
  }
  catch (error) {
    createRequestError(error)
  }
})
