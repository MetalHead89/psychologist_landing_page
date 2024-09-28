<template>
  <button
    type="button"
    v-bind="$attrs"
    class="icon-button"
  >
    <i :class="icon" />
  </button>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.icon-button {
  background: initial;
  border: initial;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $cms-text-color;
  cursor: pointer;
  font-size: 24px;
}
</style>
