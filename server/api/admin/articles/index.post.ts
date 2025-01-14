import CreateController from '~/server/controllers/articles/CreateController'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const createController = new CreateController(body)
    await createController.validate()
    const articleData = await createController.getArticleData()

    const { _id } = await ArticleSchema.create(articleData)
    return ArticleSchema.findOne({ _id })
  }
  catch (error) {
    createRequestError(error)
  }
})
