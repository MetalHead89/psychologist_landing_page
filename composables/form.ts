type TSubmit = (
  requestFunction: () => Promise<unknown>,
  successCallback?: (data: unknown) => unknown,
) => void
type TSubmitSuccessHandler = () => void
type TSubmitFailHandler = (error: TRequestError) => void

interface IUseForm {
  submit: TSubmit,
  handleSubmitSuccess: TSubmitSuccessHandler,
  handleSubmitFail: TSubmitFailHandler,
  setRequestProgressStatus: (status: boolean) => void,
  isRequestInProgress: Ref<boolean>
}

export function useForm(): IUseForm {
  const snackbar = useSnackbar()
  const isRequestInProgress = ref(false)
  const errors = ref<{ [prop: string]: string[] }>({})
  const loadingOverlay = useLoadingOverlayStore()

  provide('controlErrors', errors)

  const submit: TSubmit = (requestFunction, successCallback) => {
    setRequestProgressStatus(true)
    loadingOverlay.setIsShow(true)

    requestFunction()
      .then(data => {
        if (successCallback) {
          successCallback(data)
          return
        }

        handleSubmitSuccess()
      })
      .catch(handleSubmitFail)
      .finally(() => {
        setRequestProgressStatus(false)
        loadingOverlay.setIsShow(false)
      })
  }

  const handleSubmitSuccess: TSubmitSuccessHandler = () => {
    errors.value = {}
    snackbar.add({
      type: 'success',
      title: 'Успех',
      text: 'Успешно сохранено'
    })
  }

  const handleSubmitFail: TSubmitFailHandler = ({ data }) => {
    if (!data) {
      return
    }

    const { snackbarErrors = [], fieldErrors } = data

    if (snackbarErrors.length > 0) {
      snackbarErrors.forEach(snackbarError => {
        snackbar.add({
          type: 'error',
          title: 'Ошибка',
          text: snackbarError
        })
      })
    } else {
      snackbar.add({
        type: 'error',
        title: 'Ошибка',
        text: 'Произошла непредвиденная ошибка'
      })
    }

    errors.value = fieldErrors || {}
  }

  const setRequestProgressStatus = (status: boolean) => {
    isRequestInProgress.value = status
  }

  return {
    submit,
    handleSubmitSuccess,
    handleSubmitFail,
    setRequestProgressStatus,
    isRequestInProgress
  }
}
