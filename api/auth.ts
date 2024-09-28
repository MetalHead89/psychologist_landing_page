import type { NuxtApp } from '#app'

import { API_REALMS } from '@/shared/constants.js'

export default ({ $fetchService }: NuxtApp) => ({
  login: data => {
    return $fetchService.post({ realm: API_REALMS.cmsApi, path: '/auth/login' }, data)
      .then((data: TAuthLoginResponse) => data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  logout: () => {
    return $fetchService.post({ realm: API_REALMS.cmsApi, path: '/auth/logout' })
  },

  refresh: () => {
    const { getAccessToken } = useAuth()
    const data = { accessToken: getAccessToken() }

    return $fetchService.post({ realm: API_REALMS.cmsApi, path: '/auth/refresh' }, data)
  }
}) as IAuthApi
