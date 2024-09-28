<template>
  <div class="login-page">
    <CmsFeaturesLoginForm />
  </div>
</template>

<script lang="ts" setup>
import { CMS_ROUTE_DEFAULT } from '@/shared/constants.js'

definePageMeta({
  layout: 'empty',

  middleware: [
    () => {
      if (!import.meta.browser) {
        return
      }

      const { isAuthenticated } = useAuth()
      // const router = useRouter()

      if (isAuthenticated.value) {
        onNuxtReady(() => {
          return navigateTo({ name: CMS_ROUTE_DEFAULT })
        })
        // router.push({ name: CMS_ROUTE_DEFAULT })
      }
    }
  ]
})
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
