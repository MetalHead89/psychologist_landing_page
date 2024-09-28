import type { H3Event, EventHandlerRequest } from 'h3'

import jwt from 'jsonwebtoken'

import { CMS_COOKIE_REFRESH } from '@/shared/constants'

const config = useRuntimeConfig()

export default ({ user, event }: { user: TUserModel, event: H3Event<EventHandlerRequest> }) => {
  const { id, role, name } = user
  const userData = { id, role, name }

  const accessToken = jwt.sign(
    { userId: id },
    config.accessTokenSalt,
    {
      expiresIn: '1d'
    }
  )

  const refreshToken = jwt.sign(
    { userId: id },
    config.refreshTokenSalt,
    {
      expiresIn: '1y'
    }
  )

  setCookie(event, CMS_COOKIE_REFRESH, refreshToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) })

  return {
    accessToken,
    refreshToken,
    userData
  }
}
