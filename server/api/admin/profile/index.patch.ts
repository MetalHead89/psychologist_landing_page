import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async event => {
  try {
    const { name, password, retryPassword } = await readBody(event)
    const snackbarErrors = []
    const fieldErrors: { [prop: string]: string } = {}

    if (!name) {
      snackbarErrors.push('Не заполнено обязательное поле "Имя"')
      fieldErrors.name = 'Не может быть пустым'
    }

    if ((password || retryPassword) && password !== retryPassword) {
      snackbarErrors.push('Пароли не совпадают')
      fieldErrors.retryPassword = 'Пароли не совпадают'
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

    const data: { name: string, password?: string } = { name }

    if (password) {
      data.password = bcrypt.hashSync(password, 10)
    }

    const { userId } = jwt.decode(getAccessToken(event)) as jwt.JwtPayload

    await UserSchema.updateOne({ _id: userId }, { $set: data })

    const { id, role, name: userName } = await UserSchema.findOne({ _id: userId }) as unknown as TUserModel

    return { id, role, name: userName }
  }
  catch (error) {
    createRequestError(error)
  }
})
