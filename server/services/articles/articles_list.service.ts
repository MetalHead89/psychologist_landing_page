export const getArticles = async (page: number, perPage: number, filters = {}, fields: string[] = []) => {
  const skip = (page - 1) * perPage
  const articles = await ArticleSchema.find(filters).select(fields).skip(skip).limit(perPage)
  const totalItems = await ArticleSchema.countDocuments()

  return {
    articles,
    totalItems,
    page,
    totalPages: Math.ceil(totalItems / perPage),
    perPage
  }
}
