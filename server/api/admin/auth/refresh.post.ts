import type { H3Event, EventHandlerRequest } from 'h3'

import jwt from 'jsonwebtoken'

import createCredentials from '@/server/helpers/create_credentials'
import { CMS_COOKIE_REFRESH } from '@/shared/constants'
const { refreshTokenSalt } = useRuntimeConfig()

const createAccessDeniedError = () => {
  throw createError({
    statusCode: 403,
    statusMessage: 'Access denied'
  })
}

export default defineEventHandler(async event => {
  try {
    const { accessToken } = (await readBody(event) || {})
    const refreshToken  = getCookie(event, CMS_COOKIE_REFRESH) || ''

    if (!accessToken || !refreshToken) {
      createAccessDeniedError()
    }

    const decodedAccessToken = (jwt.decode(accessToken) as jwt.JwtPayload) || {}
    let decodedRefreshToken: string | jwt.JwtPayload | undefined = {}

    jwt.verify(
      refreshToken,
      refreshTokenSalt,
      (error, decode) => {
        if (error) {
          createAccessDeniedError()
        }

        decodedRefreshToken = decode
      })

    const user = await UserSchema.findById(decodedRefreshToken.userId)

    if (user?.id !== decodedRefreshToken.userId || user?.id !== decodedAccessToken.userId) {
      createAccessDeniedError()
    }

    return createCredentials({ user, event } as { user: TUserModel, event: H3Event<EventHandlerRequest> })
  }
  catch (error) {
    createRequestError(error)
  }
})
