import fs from 'fs'
import path from 'path'
import resizeImage from './resize_image'
import { UPLOADS_DIR } from '@/shared/constants'
import getUploadsDirPath from '@/server/helpers/get_uploads_dir_path'
import sharp from 'sharp'

export default async (base64Image: string, maxWidth: number = 2000) => {
  const uploadsFullPath = path.resolve(getUploadsDirPath())

  if (!base64Image) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No image',
      data: {
        snackbarErrors: ['Отсутствует изображение']
      }
    })
  }

  if (!fs.existsSync(uploadsFullPath)) {
    fs.mkdirSync(uploadsFullPath, { recursive: true })
  }

  const resizedImage = await resizeImage(base64Image.split(';base64,').pop() || '', maxWidth)
  const buffer = Buffer.from(resizedImage, 'base64')
  const image = sharp(buffer)
  const base64Data = (await image.toFormat('jpg').toBuffer()).toString('base64')

  const fileName = `article-image-${Date.now()}.jpg`
  const filePath = path.join(uploadsFullPath, fileName)
  const imageUrl = `/${UPLOADS_DIR}/${fileName}`

  fs.writeFileSync(filePath, base64Data, { encoding: 'base64' })

  return imageUrl
}
