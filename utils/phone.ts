const phoneWithoutFormat = (phone: string) => {
  return phone.replace(/\D/g, '')
}

export {
  phoneWithoutFormat
}
