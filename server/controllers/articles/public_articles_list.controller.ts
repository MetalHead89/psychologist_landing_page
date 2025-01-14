import { getArticles } from '@/server/services/articles/articles_list.service'
import striptags from 'striptags'

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 25
const FILTERS = { isActive: true }
const FIELDS = ['name', 'slug', 'content', 'previewImageUrl', 'createdAt']

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)

    const page = parseInt(query.page as string) || DEFAULT_PAGE
    const perPage = parseInt(query.perPage as string) || DEFAULT_PER_PAGE

    const articles = await getArticles(page, perPage, FILTERS, FIELDS)

    const result = {
      ...articles,
      articles: articles.articles.map(article => {
        const { content, name, slug, previewImageUrl, createdAt, id } = article
        return { id, name, slug, previewImageUrl, createdAt, previewText: striptags(content).split('\n')[0].trim() }
      })
    }

    return {
      success: true,
      data: result
    }
  } catch (error) {
    createRequestError(error)
  }
})
