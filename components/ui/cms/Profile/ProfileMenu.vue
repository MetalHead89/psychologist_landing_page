<template>
<div v-if="isShow" ref="profileMenu" class="profile-menu">
  <div class="section user-section">
    <CmsUiAvatar />

    <div class="user-data">
      <div class="name truncated">
        {{  user.name }}
      </div>
      <div class="role truncated">
        {{ ROLES_NAMES[user.role] }}
      </div>
    </div>
  </div>

  <div class="section navigation-section">
    <CmsUiProfileNavigation />
  </div>

  <div class="section actions-section">
    <CmsUiButton
      :is-loading="isRequestInProgress"
      class="logout-button"
      @click="handleLogoutClick"
    >
      <span>Выход</span>
      <i class="ic-logout" />
    </CmsUiButton>
  </div>
</div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

import CmsUiAvatar from './Avatar.vue'
import CmsUiProfileNavigation from './ProfileNavigation.vue'

import { CMS_ROUTE_LOGIN, ROLES_NAMES } from '@/shared/constants'

const { $api } = useNuxtApp()
const { clearAuthData } = useAuth()
const router = useRouter()
const userStore = useUserStore()
const profileMenu = ref<HTMLElement | null>(null)

const isShow = defineModel<boolean>('isShow', { default: false })

const isRequestInProgress = ref(false)

const user = computed(() => (userStore.user || {}) as TUser)

const handleLogoutClick = () => {
  isRequestInProgress.value = true

  $api.auth.logout()
    .then(() => {
      clearAuthData()
      router.push({ name: CMS_ROUTE_LOGIN })
    })
    .finally(() => { isRequestInProgress.value = true })
}

onClickOutside(profileMenu, (event: Event) => {
  const target = event.target as HTMLInputElement

  if (!target.closest('.profile-button')) {
    isShow.value = false
  }
})

</script>

<style lang="scss" scoped>
  .profile-menu {
    right: $cms-horizontal-padding;
    left: $cms-horizontal-padding;
    bottom: 0;
    transform: translateY(calc(100% + 10px));
    position: absolute;
    background: #ffffff;
    border-radius: $cms-border-radius;
    box-shadow: $cms-base-shadow;
    font-size: 16px;

    @media screen and (min-width: $sm) {
      left: initial;
      width: 225px;
    }

    .section:not(:last-child) {
      border-bottom: 1px solid #e7e7e7;
    }

    .user-section {
      padding: 10px 20px;
      display: flex;
      gap: 10px;
      align-items: center;

      .name {
        color: $primary-color;
      }

      .role {
        color: $cms-muted-color;
        font-size: 14px;
      }
    }

    .actions-section {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;

      .user-data {
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow: hidden;
      }
    }

    .logout-button {
      width: 100%;

      :deep(.text) {
        gap: 10px;
      }
    }
  }
</style>
