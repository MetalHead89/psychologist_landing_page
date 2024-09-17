<template>
  <CmsUiButton v-bind="$attrs">
    <slot />
  </CmsUiButton>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
</script>

<style lang="scss" scoped>
.button {
  background: initial;
  border: 1px solid $primary-color;
  color: $primary-color;

  &:not(.button_is-loading, :disabled):hover {
    background: rgba($primary-color, 0.1);
  }

  &:not(.button_is-loading, :disabled):active {
    background: rgba($primary-color, 0.2);
  }
}
</style>
