import fs from 'fs'
import path from 'path'

const isNodeError = (error: unknown): error is NodeJS.ErrnoException => {
  return error instanceof Error && 'code' in error
}

export default defineEventHandler(async event => {
  const base = 'uploads'
  const filePath = path.join(base, event.context.params?.name || '')

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
        statusCode: 404,
        statusMessage: `Ошибка при удалении файла: ${(error as Error).message}`
      })
    }
  }

  return sendStream(event, fs.createReadStream(filePath))
})
