export default defineEventHandler(event => {
  const redirects: Record<string, string> = {}

  const path = event.path

  if (redirects[path]) {
    sendRedirect(event, redirects[path], 301)
  }
})
