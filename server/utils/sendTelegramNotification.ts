const { notifierBotToken, psychologyTelegramChatId } = useRuntimeConfig()

export default (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message)
    return Promise.resolve()
  } else if (notifierBotToken && psychologyTelegramChatId) {
    return $fetch(`https://api.telegram.org/bot${notifierBotToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: psychologyTelegramChatId,
        parse_mode: 'html',
        text: message
      }
    })
  }
}
