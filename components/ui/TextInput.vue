<template>
  <input
    type="text"
    v-bind="$attrs"
    class="text-input"
  >
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
</script>

<style lang="scss" scoped>
.text-input {
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #f4f7f9;
  padding: 20px;
  box-sizing: border-box;
  transition: all .2s ease-in;
  outline: 2px solid transparent;

  &:hover,
  &:active,
  &:focus {
    outline: 2px solid $primary-color;
  }
}
</style>
