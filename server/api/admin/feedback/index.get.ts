export default defineEventHandler(async () => {
  try {
    return (await FeedbackSchema.find()).map(item => item.toJSON())
  }
  catch (error) {
    createRequestError(error)
  }
})
