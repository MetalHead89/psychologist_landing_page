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
  color: $error;

  &:not(.button_is-loading, :disabled):hover {
    background: rgba($error, 0.1);
    border: 1px solid $error;
  }

  &:not(.button_is-loading, :disabled):active {
    background: rgba($error, 0.2);
    border: 1px solid $error;
  }
}
</style>
