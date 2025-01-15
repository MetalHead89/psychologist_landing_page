export default (path: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return path.replace(/^\//, '')
  }

  return `../..${path}`
}
