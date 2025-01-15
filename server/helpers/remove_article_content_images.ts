import removeFile from '@/server/helpers/remove_file'
import { UPLOADS_DIR } from '@/shared/constants'

const imagePathRegex = new RegExp(`/${UPLOADS_DIR}/[^\\s"']+`, 'g')

export default ({ old, new: newText }: { old: string, new: string }) => {
  const oldPaths = new Set(old.match(imagePathRegex) || [])
  const newPaths = new Set(newText.match(imagePathRegex) || [])
  const missingPaths = [...oldPaths].filter(path => !newPaths.has(path))

  missingPaths.forEach(path => {
    removeFile(path)
  })
}
