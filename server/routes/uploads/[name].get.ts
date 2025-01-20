import fs from 'fs'
import path from 'path'
import getUploadsDirPath from '@/server/helpers/get_uploads_dir_path'
import sharp from 'sharp'

const isNodeError = (error: unknown): error is NodeJS.ErrnoException => {
  return error instanceof Error && 'code' in error
}

export default defineEventHandler(async event => {
  const filePath = path.join(getUploadsDirPath(), event.context.params?.name || '')
  const width = parseInt(getQuery(event).width as string) || undefined
  const density = getQuery(event).density as string || undefined
  const [fileName, format = 'jpg'] = filePath.split('.')
  const fullFileName = `${fileName}.jpg`

  try {
    await fs.promises.access(fullFileName)
  } catch (error: unknown) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      throw createError({
        statusCode: 404,
        statusMessage: `Файл ${fullFileName} не существует.`
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Ошибка при получении файла: ${(error as Error).message}`
      })
    }
  }

  let transformedImage = sharp(fullFileName)

  if (width) {
    transformedImage = await transformedImage.resize({ width: density && density === '2x' ? width * 2 : width })
  }

  transformedImage = await transformedImage.toFormat(format as unknown as sharp.AvailableFormatInfo)

  return sendStream(event, transformedImage)
})
