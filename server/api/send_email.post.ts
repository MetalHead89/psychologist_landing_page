/* eslint-disable import/no-named-as-default-member */

import { createTransport } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import validator from 'validator'

const config = useRuntimeConfig()

const transporter = createTransport({
  host: config.mailHost,
  port: config.mailPort,
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  }
} as unknown as SMTPTransport.Options)

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)

    await isValid(body)
      .then(async ({ name, age, anxiety, anxietyDescription, answerTarget, email, phone }) => {
        await transporter.sendMail({
          from: `${name} <${config.contactMail}>`,
          to: config.contactMail,
          subject: t('feedback.mail.subject'),
          html: `<b>${t('feedback.mail.client')}:</b> ${name}<br />` +
            `<b>${t('feedback.mail.age')}:</b> ${age}<br />` +
            // eslint-disable-next-line max-len
            `<b>${t('feedback.mail.anxiety')}:</b> ${anxiety.map(item => t(`feedback.selects.anxiety.${item}`)).join(', ')}<br />` +
            // eslint-disable-next-line max-len
            (anxietyDescription ? `<b>${t('feedback.mail.anxiety_description')}:</b> ${anxietyDescription}<br />` : '') +
            `<b>${t('feedback.mail.answer_target')}:</b> ${t(`feedback.selects.feedback_type.${answerTarget}`)}<br />` +
            (email ? `<b>${t('feedback.mail.mail')}:</b> ${email}<br />` : '') +
            (phone ? `<b>${t('feedback.mail.phone')}:</b> ${phone}<br />` : '')
        })
      })
      .catch(error => {
        return Promise.reject(error)
      })
  } catch (error: any) {
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

const isValid = ({ name, age, anxiety, anxietyDescription, answerTarget, email, phone }: TFeedbackData) => {
  const errors: TValidationErrors = {}

  if (validator.isEmpty(name)) {
    setError(errors, 'name', t('feedback.errors.cannot_be_empty'))
  }

  if (age === null || validator.isEmpty(age.toString())) {
    setError(errors, 'age', t('feedback.errors.cannot_be_empty'))
  } else if (!validator.isNumeric(age.toString())) {
    setError(errors, 'age', t('feedback.errors.invalid_number_format'))
  }

  if (!anxiety.length) {
    setError(errors, 'anxiety', t('feedback.errors.cannot_be_empty'))
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
      anxiety,
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
