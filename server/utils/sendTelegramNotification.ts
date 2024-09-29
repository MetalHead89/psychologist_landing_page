const { notifierBotToken, psychologyTelegramChatId } = useRuntimeConfig()

export default (message: string) => {
  return $fetch(`https://api.telegram.org/bot${notifierBotToken}/sendMessage`, {
    method: 'POST',
    body: {
      chat_id: psychologyTelegramChatId,
      parse_mode: 'html',
      text: message
    }
  })
}
