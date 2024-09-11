import { CMS_COOKIE_REFRESH } from '@/shared/constants'

export default defineEventHandler(event => {
  try {
    deleteCookie(event, CMS_COOKIE_REFRESH)
    return
  }
  catch (error) {
    createRequestError(error)
  }
})
