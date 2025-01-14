<template>
  <div class="breadcrumbs">
    <div
      v-for="(item, index) in breadcrumbs"
      :key="index"
      class="breadcrumbs-item"
    >
      <NuxtLink
        v-if="item.link"
        :to="{ name: item.link }"
        class="link"
      >
        {{ item.name }}
      </NuxtLink>

      <span v-else class="current-item">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  breadcrumbs:  { name: string; link?: string }[]
}

withDefaults(defineProps<IProps>(), {
  breadcrumbs: () => []
})
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    background: rgba($primary-color, 0.2);
    width: fit-content;
    padding: 10px;
    border-radius: $base-border-radius;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;

    .breadcrumbs-item {
      color: $primary-color;
      font-size: 14px;

      &:not(:last-child):after {
        display: inline-block;
        content: '';
        width: 6px;
        height: 6px;
        border-right: 2px solid $primary-color;
        border-bottom: 2px solid $primary-color;
        transform: rotate(-45deg);
        border-radius: 2px;
        margin-left: 7px;
      }
    }

    .link {
      text-decoration: none;
      color: $primary-color;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }

    .current-item {
      font-weight: 600;
    }
  }
</style>
