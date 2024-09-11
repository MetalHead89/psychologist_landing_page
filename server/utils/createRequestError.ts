export default (error: unknown) => {
  if (!error || (error as TRequestError).statusCode === 500) {
    throw createError({
      ...((error || {}) as TRequestError),
      data: {
        snackbarError: 'Неизвестная ошибка, попробуйте позже'
      }
    })
  }

  throw createError(error)
}
