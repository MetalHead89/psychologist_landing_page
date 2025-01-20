import fs from 'fs'
import path from 'path'
import getUploadsDirPath from '@/server/helpers/get_uploads_dir_path'
import sharp from 'sharp'

const isNodeError = (error: unknown): error is NodeJS.ErrnoException => {
  return error instanceof Error && 'code' in error
}

export default defineEventHandler(async event => {
  const [fileName, format = 'jpg'] = (event.context.params?.name || '').split('.')
  const fullFileName = `${fileName}.jpg`
  const filePath = path.join(getUploadsDirPath(), fullFileName)
  const width = parseInt(getQuery(event).width as string) || undefined
  const density = getQuery(event).density as string || undefined

  try {
    await fs.promises.access(filePath)
  } catch (error: unknown) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      throw createError({
        statusCode: 404,
        statusMessage: `Файл ${filePath} не существует.`
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Ошибка при получении файла: ${(error as Error).message}`
      })
    }
  }

  let transformedImage = sharp(filePath)

  if (width) {
    transformedImage = await transformedImage.resize({ width: density && density === '2x' ? width * 2 : width })
  }

  transformedImage = await transformedImage.toFormat(format as unknown as sharp.AvailableFormatInfo)

  return sendStream(event, transformedImage)
})
