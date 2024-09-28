export default defineEventHandler(async () => {
  try {
    return await FeedbackSchema.find({ isShowed: true })
  }
  catch (error) {
    createRequestError(error)
  }
})
