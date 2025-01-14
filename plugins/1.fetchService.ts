import type { FetchContext, ResponseType } from 'ofetch'
import type { NitroFetchOptions } from 'nitropack'

import { CMS_LS_ACCESS_TOKEN, API_REALMS } from '@/shared/constants.js'

const REFRESH_REQUEST_PATH = '/api/admin/auth/refresh'
const LOGIN_PAGE_PATH = '/admin/login'

export default defineNuxtPlugin(nuxtApp => {
  const DEFAULT_REALM = 'api'

  const REALMS_ENDPOINTS = {
    [API_REALMS.api]: '/api',
    [API_REALMS.cmsApi]: '/api/admin'
  }

  type TFetchPath = {
    realm: keyof typeof REALMS_ENDPOINTS | undefined,
    path: string
  }

  interface IFetchService {
    get: (path: TFetchPath, params?: Record<string, unknown>) => Promise<unknown>,
    post: (path: TFetchPath, body: BodyInit | Record<string, unknown> | null | undefined) => Promise<unknown>
    patch: (path: TFetchPath, body: BodyInit | Record<string, unknown> | null | undefined) => Promise<unknown>
    delete: (path: TFetchPath, body: BodyInit | Record<string, unknown> | null | undefined) => Promise<unknown>
  }

  const onRequest = (context: FetchContext<unknown, ResponseType> & { options: { realm: string } }) => {
    if (import.meta.browser && context.options.realm === API_REALMS.cmsApi) {
      const accessToken = localStorage.getItem(CMS_LS_ACCESS_TOKEN)
      const headers = {
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
      }
      context.options.headers = new Headers(headers)
    }
  }

  const onResponseError = async ({ request, response, options }: FetchContext<unknown, ResponseType>) => {
    const { $api } = useNuxtApp()
    const isUnauthorized = response?.status === 401
    const isRefreshRequest = request === REFRESH_REQUEST_PATH
    const { clearAuthData, setAuthData } = useAuth()

    if (isRefreshRequest) {
      clearAuthData()
      navigateTo(LOGIN_PAGE_PATH)
    }

    if (isUnauthorized) {
      try {
        const data = await $api.auth.refresh()
        setAuthData(data)
        fetch(request, options as NitroFetchOptions<RequestInfo>)
      } catch {
        return
      }
    }
  }

  const createFullPath = ({ realm, path }: TFetchPath) => {
    return `${REALMS_ENDPOINTS[realm || DEFAULT_REALM]}${path || ''}`
  }

  const fetch = $fetch.create({ onRequest, onResponseError })

  const fetchService: IFetchService = {
    get: (path, params) => fetch(createFullPath(path), { method: 'get', realm: path.realm, params }),
    post: (path, body) => fetch(createFullPath(path), { method: 'post', body, realm: path.realm }),
    patch: (path, body) => fetch(createFullPath(path), { method: 'patch', body, realm: path.realm }),
    delete: (path, body) => fetch(createFullPath(path), { method: 'delete', body, realm: path.realm })
  }

  nuxtApp.provide('fetchService', fetchService)
})
