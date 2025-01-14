import type { NuxtApp } from '#app'

import { API_REALMS } from '@/shared/constants.js'

export default ({ $fetchService }: NuxtApp) => ({
  getList: params => {
    return $fetchService.get({ realm: API_REALMS.cmsApi, path: '/articles' }, params)
      .then(({ data }: { data: TArticlesListResponse }) => data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  newImage: params => {
    return $fetchService.post({ realm: API_REALMS.cmsApi, path: '/articles/new_image' }, params)
      .then(({ imageUrl }: { imageUrl: string }) => imageUrl)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  create: data => {
    return $fetchService.post({ realm: API_REALMS.cmsApi, path: '/articles' }, data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  update: data => {
    return $fetchService.patch({ realm: API_REALMS.cmsApi, path: `/articles/${data.id}` }, data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  get: id => {
    return $fetchService.get({ realm: API_REALMS.cmsApi, path: `/articles/${id}` })
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  delete: id => {
    return $fetchService.delete({ realm: API_REALMS.cmsApi, path: `/articles/${id}` })
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  getPublicList: params => {
    return $fetchService.get({ realm: API_REALMS.api, path: '/articles' }, params)
      .then(({ data }: { data: TArticlesListResponse }) => data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  },

  getPublicArticle: slug => {
    return $fetchService.get({ realm: API_REALMS.api, path: `/articles/${slug}` })
      .then(({ data }: { data: TArticleModel }) => data)
      .catch(({ data }: { data: TRequestError }) => Promise.reject(data))
  }
}) as IArticlesApi
