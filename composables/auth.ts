import {
  CMS_LS_USER,
  CMS_LS_ACCESS_TOKEN
} from '@/shared/constants.js'

interface IUseAuth {
  setAuthData: (data: TAuthLoginResponse) => void,
  isAuthenticated: ComputedRef<boolean>
  clearAuthData: () => void,
  getAccessToken: () => string | null,
}

export function useAuth(): IUseAuth {
  const setAuthData = ({ user, accessToken }: TAuthLoginResponse) => {
    localStorage.setItem(CMS_LS_USER, JSON.stringify(user))
    localStorage.setItem(CMS_LS_ACCESS_TOKEN, accessToken)
  }

  const isAuthenticated = computed(() => {
    return import.meta.browser ? !!localStorage.getItem(CMS_LS_ACCESS_TOKEN) : false
  })

  const clearAuthData = () => {
    localStorage.removeItem(CMS_LS_USER)
    localStorage.removeItem(CMS_LS_ACCESS_TOKEN)
  }

  const getAccessToken = () => {
    return localStorage.getItem(CMS_LS_ACCESS_TOKEN)
  }

  return {
    setAuthData,
    isAuthenticated,
    clearAuthData,
    getAccessToken
  }
}
