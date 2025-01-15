import { UPLOADS_DIR } from '@/shared/constants'

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    return UPLOADS_DIR
  }

  return `../${UPLOADS_DIR}`
}
