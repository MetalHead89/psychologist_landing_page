<template>
  <nav class="profile-navigation">
    <ul class="list">
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <NuxtLink
          :to="{ name: item.routeName }"
          class="item"
          @click="handleItemClick"
        >
          <i :class="['icon', item.icon]" />
          <div class="truncated">{{ item.title }}</div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const items = [
  { icon: 'ic-account-outline', title: 'Профиль', routeName: 'admin-profile' }
]

const emit = defineEmits(['click-to-item'])

const handleItemClick = () => {
  emit('click-to-item')
}
</script>

<style lang="scss" scoped>
  .profile-navigation {
    .list {
      padding: 5px 0;
      margin: 0;
      list-style: none;
    }

    .item {
      display: flex;
      align-items: center;
      color: $cms-text-color;
      gap: 10px;
      margin: 0 10px;
      padding: 8px 15px;
      font-size: 16px;
      border-radius: $cms-border-radius;
      line-height: 1;
      cursor: pointer;
      transition: $cms-base-hover-transition;
      text-decoration: none;

      &:hover {
        background: $cms-hover-bg-color;
      }
    }

    .icon {
      font-size: 25px;
    }
  }
</style>
