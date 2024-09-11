<template>
  <div class="profile-page">
    profile
    <button type="button" @click="handleLogoutClick">
      Выйти
    </button>
  </div>
</template>

<script lang="ts" setup>
import { CMS_ROUTE_LOGIN } from '@/shared/constants'

const { $api } = useNuxtApp()
const { clearAuthData } = useAuth()
const router = useRouter()

definePageMeta({
  layout: 'cms'
})

const handleLogoutClick = () => {
  $api.auth.logout()
    .then(() => {
      clearAuthData()
      router.push({ name: CMS_ROUTE_LOGIN })
    })
}

onMounted(() => {
  $api.profile.get()
})
</script>

<style lang="scss" scoped>
.profile-page {
  height: 100%;
}
</style>
