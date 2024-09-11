import { CMS_ROUTE_LOGIN } from '@/shared/constants'

export default defineNuxtRouteMiddleware(to => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const routeFullPath = to.fullPath
  const isProtectedCmsRoute = routeFullPath.startsWith('/admin') && routeFullPath !== '/admin/login'

  if (isProtectedCmsRoute && import.meta.browser &&!isAuthenticated.value) {
    router.push({ name: CMS_ROUTE_LOGIN })
  }
})
