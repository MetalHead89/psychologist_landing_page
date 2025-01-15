import removeFile from '@/server/helpers/remove_file'
import removeArticleContentImages from '@/server/helpers/remove_article_content_images'

export default defineEventHandler(async event => {
  try {
    const { id } = (event.context.params || {})
    const currentBdArticleData = await ArticleSchema.findOne({ _id: id })

    await ArticleSchema.deleteOne({ _id: id })

    if (currentBdArticleData?.previewImageUrl) {
      await removeFile(currentBdArticleData.previewImageUrl)
    }

    removeArticleContentImages({ old: currentBdArticleData?.content || '', new: '' })

    return { success: true }
  }
  catch (error) {
    createRequestError(error)
  }
})