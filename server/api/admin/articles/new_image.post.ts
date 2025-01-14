import saveArticleImage from '@/server/helpers/save_article_image'

export default defineEventHandler(async event => {
  try {
    const { base64Image } = await readBody(event)
    const imageUrl = await saveArticleImage(base64Image)

    return {
      success: true,
      imageUrl
    }
  }
  catch (error) {
    createRequestError(error)
  }
})
