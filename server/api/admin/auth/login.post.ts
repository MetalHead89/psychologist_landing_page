import type { H3Event, EventHandlerRequest } from 'h3'

import bcrypt from 'bcrypt'

import createCredentials from '@/server/helpers/create_credentials'

export default defineEventHandler(async event => {
  try {
    const { login, password } = await readBody(event)

    if (!login || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Required fields are not filled in',
        data: {
          snackbarErrors: ['Не заполнены обязательные поля']
        }
      })
    }

    const user = await UserSchema.findOne({ login })

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email or password is wrong! please try again later',
        data: {
          snackbarErrors: ['Не верный логин или пароль']
        }
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email or password is wrong! please try again later',
        data: {
          snackbarErrors: ['Не верный логин или пароль']
        }
      })
    }

    return createCredentials({ user, event } as { user: TUserModel, event: H3Event<EventHandlerRequest> })
  }
  catch (error) {
    createRequestError(error)
  }
})
