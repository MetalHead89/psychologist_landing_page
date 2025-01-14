import SaveController from './BaseSaveController'

export default class UpdateController extends SaveController {
  protected async validateSlug(): Promise<void> {
    const { slug, id: articleId } = this.body

    if (!slug) {
      this.snackbarErrors.push('Не заполнено обязательное поле "Slug"')
      this.fieldErrors.retryPassword = 'Не может быть пустым'
    } else if (/[^a-z0-9_]/.test(slug)) {
      this.snackbarErrors.push('Slug может содержать только буквы латинского алфавита в нижнем регистре (a-z), цифры (0-9) и нижнее подчеркивание _')
      this.fieldErrors.slug = 'Некорректный slug'
    } else {
      const { id } = await ArticleSchema.findOne({ slug }) || {}
      if (id && (id !== articleId)) {
        this.snackbarErrors.push('Статья с таким slug уже существует')
        this.fieldErrors.slug = 'Данный slug занят'
      }
    }
  }
}
