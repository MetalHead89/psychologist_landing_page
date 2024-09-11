import jwt from 'jsonwebtoken'

import { API_ROUTE_LOGIN, API_ROUTE_REFRESH } from '@/shared/constants'

const CMS_ROUTES_WITHOUT_AUTHORIZATION = [API_ROUTE_LOGIN, API_ROUTE_REFRESH]

const createNotAuthorizedError = () => {
  throw createError({
    statusCode: 401,
    statusMessage: 'User is not authorized'
  })
}

export default defineEventHandler(event => {
  const requestPath = getRequestURL(event).pathname
  const isProtectedCmsRequest = requestPath.startsWith('/api/admin') &&
    !CMS_ROUTES_WITHOUT_AUTHORIZATION.includes(requestPath)

  if (isProtectedCmsRequest) {
    const authHeader = getRequestHeader(event, 'Authorization')
    const accessToken = authHeader?.split(' ')[1] || ''

    if (!accessToken) {
      createNotAuthorizedError()
    }

    jwt.verify(
      accessToken,
      useRuntimeConfig().accessTokenSalt,
      error => {
        if (error) {
          createNotAuthorizedError()
        }
      })
  }
})
