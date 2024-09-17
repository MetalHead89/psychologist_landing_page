<template>
  <nav class="profile-navigation">
    <ul class="list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="item"
      >
        <i :class="['icon', item.icon]" />
        <div class="truncated">{{ item.title }}</div>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const items = [
  { icon: 'ic-account-outline', title: 'Профиль' }
]
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

      &:hover {
        background: $cms-hover-bg-color;
      }
    }

    .icon {
      font-size: 25px;
    }
  }
</style>
