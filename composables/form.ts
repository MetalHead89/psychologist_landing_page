import { Validation } from '@vuelidate/core'
import { provide } from 'vue'

export function useForm() {
  const snackbar = useSnackbar()
  const { t } = useI18n()
  const errors: Ref<TAnyObject> = ref({})
  const isLoading : Ref<boolean> = ref(false)

  provide('errors', errors)

  const setErrors = (v$: Ref<Validation>, keys: TAnyObject) => {
    const localErrors: TAnyObject = {}

    Object.keys(keys).forEach(key => {
      const prop = v$.value[key].$errors[0]

      if (prop) {
        localErrors[key] = v$.value[key].$errors[0].$message
      }
    })

    errors.value = localErrors
  }

  const afterRequest = (response: Promise<any>) => {
    response
      .then(({ title, text }) => {
        errors.value = {}

        snackbar.add({
          type: 'success',
          title,
          text
        })
      })
      .catch(({ data }) => {
        if (data.statusCode === 500) {
          snackbar.add({
            type: 'error',
            title: t('composables.form.snackbar.server_error_title'),
            text: t('composables.form.snackbar.server_error_text')
          })

          return null
        }

        const { statusMessage, data: errorData } = data

        snackbar.add({
          type: 'error',
          title: t('composables.form.snackbar.server_error_title'),
          text: statusMessage
        })

        errors.value = errorData?.errors || {}
      })
      .finally(() => { isLoading.value = false })
  }

  return { setErrors, afterRequest, isLoading }
}
