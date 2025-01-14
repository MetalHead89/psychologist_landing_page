export default defineEventHandler(async event => {
  try {
    const { slug } = (event.context.params || {})

    const article =  await ArticleSchema.findOne({ slug, isActive: true })

    if (!article ) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Статья не найдена'
      })
    }

    return {
      success: true,
      data: article
    }
  }
  catch (error) {
    createRequestError(error)
  }
})
