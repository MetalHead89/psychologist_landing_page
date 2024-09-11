type TSubmit = (requestFunction: () => Promise<unknown>) => void
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

  const submit: TSubmit = requestFunction => {
    setRequestProgressStatus(true)

    requestFunction()
      .then(handleSubmitSuccess)
      .catch(handleSubmitFail)
      .finally(() => setRequestProgressStatus(false))
  }

  const handleSubmitSuccess: TSubmitSuccessHandler = () => {
    console.log('Submit success')
  }

  const handleSubmitFail: TSubmitFailHandler = ({ data }) => {
    if (!data) {
      return
    }

    const { snackbarError } = data

    if (snackbarError) {
      snackbar.add({
        type: 'error',
        title: 'Ошибка',
        text: snackbarError
      })
    }
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


// type TSubmitHandler = ({ promise }: { promise: Promise<unknown> }) => void

// interface IUseForm {
//   submitHandler: TSubmitHandler
// }

// export function useForm(): IUseForm {
//   const submitHandler: TSubmitHandler = promise => {
//     console.dir(promise)
//   }

//   return { submitHandler }
// }
