<template>
  <button v-bind="$attrs" class="close-button">
    <i class="ic-close" />
  </button>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
</script>

<style lang="scss" setup>
.close-button {
  background: none;
  padding: 0;
  margin: 0;
  line-height: 0;
  border: none;
  font-size: 30px;
  cursor: pointer;
}
</style>
