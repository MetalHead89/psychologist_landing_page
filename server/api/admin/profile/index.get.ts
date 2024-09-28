import jwt from 'jsonwebtoken'

export default defineEventHandler(async event => {
  try {
    const { userId } = jwt.decode(getAccessToken(event)) as jwt.JwtPayload
    const { id, role, name: userName } = await UserSchema.findOne({ _id: userId }) as unknown as TUserModel

    return { id, role, name: userName }
  }
  catch (error) {
    createRequestError(error)
  }
})
