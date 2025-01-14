import fs from 'fs'
import path from 'path'

const isNodeError = (error: unknown): error is NodeJS.ErrnoException => {
  return error instanceof Error && 'code' in error
}

export default async (filePath: string) => {
  try {
    const absolutePath = path.resolve(filePath)
    await fs.promises.access(absolutePath)
    await fs.promises.unlink(absolutePath)
  } catch (error: unknown) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      console.log(`Файл ${filePath} не существует.`)
    } else {
      console.error(`Ошибка при удалении файла: ${(error as Error).message}`)
    }
  }

  return Promise.resolve()
}
