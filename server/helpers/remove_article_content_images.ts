import removeFile from '@/server/helpers/remove_file'

const imagePathRegex = /\/articles\/images\/[^\s"']+/g

export default ({ old, new: newText }: { old: string, new: string }) => {
  const oldPaths = new Set(old.match(imagePathRegex) || [])
  const newPaths = new Set(newText.match(imagePathRegex) || [])
  const missingPaths = [...oldPaths].filter(path => !newPaths.has(path))

  missingPaths.forEach(path => {
    removeFile(`public${path}`)
  })
}
