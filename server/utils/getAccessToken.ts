import type { H3Event, EventHandlerRequest } from 'h3'

export default (event: H3Event<EventHandlerRequest>) => {
  const authHeader = getRequestHeader(event, 'Authorization')
  return authHeader?.split(' ')[1] || ''
}