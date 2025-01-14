export default defineEventHandler(async event => {
  try {
    const { id } = (event.context.params || {})

    return ArticleSchema.findOne({ _id: id })
  }
  catch (error) {
    createRequestError(error)
  }
})
