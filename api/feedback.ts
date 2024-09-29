import type { NuxtApp } from '#app'

import { API_REALMS } from '@/shared/constants.js'

export default ({ $fetchService }: NuxtApp) => ({
  add: data => {
    return $fetchService.post({ realm: API_REALMS.api, path: '/feedback' }, data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  getAllowedReviews: () => {
    return $fetchService.get({ realm: API_REALMS.api, path: '/feedback/allowed_reviews' })
  },

  get: params => {
    return $fetchService.get({ realm: API_REALMS.cmsApi, path: '/feedback' }, params)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  update: (id, data) => {
    return $fetchService.patch({ realm: API_REALMS.cmsApi, path: `/feedback/${id}` }, data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  }
}) as IFeedbackApi
