import { Validation } from '@vuelidate/core'
import { provide } from 'vue'

type TAnyObject = { [prop: string]: string }

export function useForm() {
  const errors: Ref<TAnyObject> = ref({})

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

  const afterRequest = (response: Promise<unknown>) => {
    response
      .then(() => {
        errors.value = {}
      })
      .catch(({ data }) => {
        const localErrors = data?.data?.errors

        if (!errors) {
          return null
        }

        errors.value = localErrors
      })
  }

  return { setErrors, afterRequest }
}
