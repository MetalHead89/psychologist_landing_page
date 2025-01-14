import sharp from 'sharp'

export default async function(base64Image: string, maxWidth: number = 2000) {
  try {
    const buffer = Buffer.from(base64Image, 'base64')
    const image = sharp(buffer)
    const { width } = await image.metadata()

    if (!width) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid image',
        data: {
          snackbarErrors: ['Некорректное изображение']
        }
      })
    }

    if (width < maxWidth) {
      return base64Image
    }

    const resizedBuffer = await image
      .resize({ width: maxWidth })
      .toBuffer()

    return resizedBuffer.toString('base64')

  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Save image error',
      data: {
        snackbarErrors: ['Ошибка при сохранении изображения']
      }
    })
  }
}
