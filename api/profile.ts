import type { NuxtApp } from '#app'

import { API_REALMS } from '@/shared/constants.js'

export default ({ $fetchService }: NuxtApp) => ({
  get: () => {
    return $fetchService.get({ realm: API_REALMS.cmsApi, path: '/profile' })
      .then((data: TUser) => data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  update: data => {
    return $fetchService.patch({ realm: API_REALMS.cmsApi, path: '/profile' }, data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  }
}) as IProfileApi
