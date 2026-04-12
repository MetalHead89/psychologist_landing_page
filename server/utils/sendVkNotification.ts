export default (message: string) => {
  const { notifierBotTokenVk, notifierChatIdVk } = useRuntimeConfig()

  if (!notifierBotTokenVk || !notifierChatIdVk) {
    return Promise.resolve()
  }

  const params = new URLSearchParams({
    peer_id: String(notifierChatIdVk),
    random_id: Date.now().toString(),
    message,
    access_token: notifierBotTokenVk,
    v: '5.199'
  })

  return $fetch(`https://api.vk.ru/method/messages.send?${params}`)
}
