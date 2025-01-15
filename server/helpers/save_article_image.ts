import fs from 'fs'
import path from 'path'
import resizeImage from './resize_image'
import { UPLOADS_DIR } from '@/shared/constants'

export default async (base64Image: string, maxWidth: number = 2000) => {
  const imagesDir = path.resolve(UPLOADS_DIR)

  if (!base64Image) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No image',
      data: {
        snackbarErrors: ['Отсутствует изображение']
      }
    })
  }

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  const base64Data = await resizeImage(base64Image.split(';base64,').pop() || '', maxWidth)

  const mimeType = base64Image.split(';')[0].split(':')[1]
  const extension = mimeType === 'image/svg+xml' ? 'svg' : 'jpg'
  const fileName = `article-image-${Date.now()}.${extension}`
  const filePath = path.join(imagesDir, fileName)
  const imageUrl = `/${UPLOADS_DIR}/${fileName}`

  fs.writeFileSync(filePath, base64Data, { encoding: 'base64' })

  return imageUrl
}
