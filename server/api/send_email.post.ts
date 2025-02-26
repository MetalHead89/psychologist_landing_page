import validator from 'validator'
export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)

    await isValid(body)
      .then(async ({ name, age, anxietyDescription, answerTarget, email, phone }) => {
        const message = `<b>${t('feedback.mail.new_appointment')}</b>\n` +
        `<b>${t('feedback.mail.client')}:</b> ${name}\n` +
        `<b>${t('feedback.mail.age')}:</b> ${age}\n` +
        (anxietyDescription ? `<b>${t('feedback.mail.anxiety_description')}:</b> ${anxietyDescription}\n` : '') +
        `<b>${t('feedback.mail.answer_target')}:</b> ${t(`feedback.selects.feedback_type.${answerTarget}`)}\n` +
        (email ? `<b>${t('feedback.mail.mail')}:</b> ${email}\n` : '') +
        (phone ? `<b>${t('feedback.mail.phone')}:</b> ${phone}\n` : '')

        await sendTelegramNotification(message)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await await sendTelegramNotification(error)

    const { statusCode, errors, message } = error?.cause || {}
    const data = errors
      ? {
        data: {
          errors: errors || error.message || t('feedback.errors.unknown_server_error')
        }
      }
      : {}

    sendError(event, createError(({
      statusCode: statusCode || 500,
      ...data,
      statusMessage: message || error?.message
    })))
  }
})

type TValidationErrors = {
  [key in keyof TFeedbackData]?: Array<string>
}

const isValid = ({
  name,
  age,
  anxietyDescription,
  answerTarget,
  email,
  phone,
  consentProcessing
}: TFeedbackData) => {
  const errors: TValidationErrors = {}

  if (validator.isEmpty(name)) {
    setError(errors, 'name', t('feedback.errors.cannot_be_empty'))
  }

  if (age === null || validator.isEmpty(age.toString())) {
    setError(errors, 'age', t('feedback.errors.cannot_be_empty'))
  } else if (!validator.isNumeric(age.toString())) {
    setError(errors, 'age', t('feedback.errors.invalid_number_format'))
  }

  if (validator.isEmpty(answerTarget)) {
    setError(errors, 'answerTarget', t('feedback.errors.cannot_be_empty'))
  }

  if (answerTarget === 'email' && !email) {
    setError(errors, 'email', t('feedback.errors.cannot_be_empty'))
  }

  if (answerTarget === 'email' && email && !validator.isEmail(email)) {
    setError(errors, 'email', t('feedback.errors.invalid_email_format'))
  }

  if (answerTarget && answerTarget !== 'email' && !phone) {
    setError(errors, 'phone', t('feedback.errors.cannot_be_empty'))
  }

  if (answerTarget && answerTarget !== 'email' && (phone?.length !== 11 || !validator.isNumeric(phone.toString()))) {
    setError(errors, 'phone', t('feedback.errors.invalid_phone'))
  }

  if (!consentProcessing) {
    setError(errors, 'consentProcessing', t('feedback.errors.consent_processing_cannot_be_false'))
  }

  if (Object.keys(errors).length > 0) {
    return Promise.reject(new Error('Ошибка', {
      cause: {
        statusCode: 400,
        errors,
        message: t('feedback.errors.problems_with_parameters')
      }
    }))
  } else {
    return Promise.resolve({
      name,
      age,
      anxietyDescription,
      answerTarget,
      email: email && validator.normalizeEmail(email),
      phone
    })
  }
}

const setError = (errors: TValidationErrors, key: keyof TFeedbackData, message: string) => {
  if (!errors[key]) {
    errors[key] = []
  }

  errors[key]?.push(message)
}
