import UpdateController from '@/server/controllers/articles/UpdateController'
import removeFile from '@/server/helpers/remove_file'
import removeArticleContentImages from '@/server/helpers/remove_article_content_images'
import getUploadsFilePath from '@/server/helpers/get_uploads_file_path'

export default defineEventHandler(async event => {
  try {
    const { id } = (event.context.params || {})
    const body = await readBody(event)
    const updateController = new UpdateController(body)
    await updateController.validate()
    const articleData = await updateController.getArticleData()
    const currentBdArticleData = await ArticleSchema.findOne({ _id: id })

    await ArticleSchema.updateOne({ _id: id }, { $set: articleData })

    if ((body.previewImage || !articleData.previewImageUrl) && currentBdArticleData?.previewImageUrl) {
      console.log('body.previewImage: ',body.previewImage)
      console.log('articleData.previewImageUrl: ',articleData.previewImageUrl)
      await removeFile(getUploadsFilePath(currentBdArticleData.previewImageUrl))
    }

    removeArticleContentImages({ old: currentBdArticleData?.content || '', new: body.content })

    return ArticleSchema.findOne({ _id: id })
  }
  catch (error) {
    createRequestError(error)
  }
})