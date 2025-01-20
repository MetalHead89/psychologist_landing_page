import saveArticleImage from '@/server/helpers/save_article_image'

type TExtendedArticlePayload = TArticlePayload & {
  previewImageUrl?: string}

const ARTICLE_FIELDS = ['name', 'slug', 'content', 'description', 'keywords', 'isActive', 'title', 'previewImageUrl']

export default abstract class ArticleValidator {
  protected body: TArticlePayload
  protected snackbarErrors: string[] = []
  protected fieldErrors: { [prop: string]: string } = {}

  constructor(body: TArticlePayload) {
    this.body = body
  }

  async validate(): Promise<void> {
    this.performCommonValidation()
    await this.validateSlug()

    if (this.snackbarErrors.length > 0 || Object.keys(this.fieldErrors).length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Required fields are not filled in',
        data: { snackbarErrors: this.snackbarErrors, fieldErrors: this.fieldErrors }
      })
    }
  }

  protected performCommonValidation(): void {
    const { name, content } = this.body

    if (!name) {
      this.snackbarErrors.push('Не заполнено обязательное поле "Название"')
      this.fieldErrors.name = 'Не может быть пустым'
    }

    if (!content) {
      this.snackbarErrors.push('Не заполнено обязательное поле "Контент статьи"')
      this.fieldErrors.content = 'Не может быть пустым'
    }
  }

  protected abstract validateSlug(): Promise<void>

  async getArticleData(): Promise<TExtendedArticlePayload> {
    const articleData: TExtendedArticlePayload = ARTICLE_FIELDS.reduce((acc, field) => ({
      ...acc,
      ...(
        typeof (this.body)[field as keyof TArticlePayload] !== 'undefined' ?
          { [field]: this.body[field as keyof TArticlePayload] } :
          {}
      )
    }), {})

    if (this.body.previewImage) {
      const imageUrl = await saveArticleImage(this.body.previewImage)
      articleData.previewImageUrl = imageUrl
    } else if (this.body.previewImage === null) {
      articleData.previewImageUrl = ''
    }

    return articleData
  }
}
