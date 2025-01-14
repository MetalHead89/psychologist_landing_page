import { getArticles } from '@/server/services/articles/articles_list.service'

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 25

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)

    const page = parseInt(query.page as string) || DEFAULT_PAGE
    const perPage = parseInt(query.perPage as string) || DEFAULT_PER_PAGE

    const result = await getArticles(page, perPage)

    return {
      success: true,
      data: result
    }
  } catch (error) {
    createRequestError(error)
  }
})
