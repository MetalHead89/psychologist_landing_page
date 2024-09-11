export default defineEventHandler(() => {
  try {
    return
  }
  catch (error) {
    createRequestError(error)
  }
})
