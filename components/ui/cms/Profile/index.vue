<template>
  <div class="profile">
    <button type="button" class="profile-button" @click="toggleMenuShow">
      <CmsUiAvatar />
    </button>

    <CmsUiProfileMenu v-model:is-show="isShowMenu" />
  </div>
</template>

<script lang="ts" setup>
import CmsUiAvatar from './Avatar.vue'
import CmsUiProfileMenu from './ProfileMenu.vue'

const isShowMenu = ref(false)

const toggleMenuShow = () => {
  isShowMenu.value = !isShowMenu.value
}
</script>

<style lang="scss" scoped>
  .profile {
    .profile-button {
      padding: 0;
      margin: 0;
      background: initial;
      border: initial;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $cms-text-color;
      cursor: pointer;
    }
  }
</style>
