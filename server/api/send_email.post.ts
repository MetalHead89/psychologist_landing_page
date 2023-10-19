import { createTransport } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import escape from 'validator/lib/escape'
import normalizeEmail from 'validator/lib/normalizeEmail'

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
      .then(async ({ name, email, appealReason }) => {
        await transporter.sendMail({
          from: `${name} <${email}>`,
          to: config.contactMail,
          subject: 'Запись на прием',
          html: `<b>Клиент:</b> ${name}<br />` +
            `<b>Почта:</b> ${email}<br />` +
            `<b>Причина обращения:</b> ${appealReason}<br />`
        })
      })
      .catch(errors => {
        return Promise.reject(errors)
      })
  } catch (errors) {
    sendError(event, createError(({
      statusCode: 400,
      data: {
        errors
      }
    })))
  }
})

type TValidationErrors = {
  [key in keyof TFeedbackData]?: Array<string>
}

const isValid = ({ name, email, appealReason }: TFeedbackData) => {
  const errors: TValidationErrors = {}

  if (isEmpty(name)) {
    setError(errors, 'name', t('feedback.errors.cannot_be_empty'))
  }

  if (isEmpty(email)) {
    setError(errors, 'email', t('feedback.errors.cannot_be_empty'))
  }

  if (!isEmail(email)) {
    setError(errors, 'email', t('feedback.errors.invalid_email_format'))
  }

  if (isEmpty(appealReason)) {
    setError(errors, 'appealReason', t('feedback.errors.cannot_be_empty'))
  }

  if (Object.keys(errors).length > 0) {
    return Promise.reject(errors)
  } else {
    return Promise.resolve({
      name: escape(name),
      email: normalizeEmail(email),
      appealReason: escape(appealReason)
    })
  }
}

const setError = (errors: TValidationErrors, key: keyof TFeedbackData, message: string) => {
  if (!errors[key]) {
    errors[key] = []
  }

  errors[key]?.push(message)
}
