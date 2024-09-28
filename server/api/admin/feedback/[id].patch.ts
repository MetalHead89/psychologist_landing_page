export default defineEventHandler(async event => {
  try {
    const { id } = (event.context.params || {})
    const { name, rating, feedback, isShowed } = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Required fields are not filled in'
      })
    }

    const data = {
      ...(name ? { name } : {}),
      ...(rating ? { rating } : {}),
      ...(feedback ?{ feedback } : {}),
      ...(typeof isShowed === 'boolean' ? { isShowed } : {}),
      isForModeration: false
    }

    await FeedbackSchema.updateOne({ _id: id }, { $set: data })
    return FeedbackSchema.findOne({ _id: id })
  }
  catch (error) {
    createRequestError(error)
  }
})
