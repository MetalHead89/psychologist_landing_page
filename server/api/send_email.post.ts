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
      .then(async ({ name, email, appealReason }) => {
        await transporter.sendMail({
          from: `${name} <${email}>`,
          to: config.contactMail,
          subject: t('feedback.mail.subject'),
          html: `<b>${t('feedback.mail.client')}:</b> ${name}<br />` +
            `<b>${t('feedback.mail.mail')}:</b> ${email}<br />` +
            `<b>${t('feedback.mail.appeal_reason')}:</b> ${appealReason}<br />`
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

const isValid = ({ name, email, appealReason }: TFeedbackData) => {
  const errors: TValidationErrors = {}

  if (validator.isEmpty(name)) {
    setError(errors, 'name', t('feedback.errors.cannot_be_empty'))
  }

  if (validator.isEmpty(email)) {
    setError(errors, 'email', t('feedback.errors.cannot_be_empty'))
  }

  if (!validator.isEmail(email)) {
    setError(errors, 'email', t('feedback.errors.invalid_email_format'))
  }

  if (validator.isEmpty(appealReason)) {
    setError(errors, 'appealReason', t('feedback.errors.cannot_be_empty'))
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
      name: escape(name),
      email: validator.normalizeEmail(email),
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
