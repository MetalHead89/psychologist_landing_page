<template>
  <CmsUiBorderedButton v-bind="$attrs">
    <slot />
  </CmsUiBorderedButton>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
</script>

<style lang="scss" scoped>
.button {
  border: 1px solid $error;
  color: #ffffff;
  background: $error;

  &:not(.button_is-loading, :disabled):hover {
    background: rgba($error, 0.8);
    border: 1px solid rgba($error, 0.8);
  }

  &:not(.button_is-loading, :disabled):active {
    background: rgba($error, 0.9);
    border: 1px solid rgba($error, 0.9);
  }
}
</style>
