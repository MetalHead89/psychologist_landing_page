<template>
  <button
    :type="type"
    v-bind="$attrs"
    class="button"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
export interface Props {
  type?: 'button' | 'submit' | 'reset'
}

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<Props>(), {
  type: 'button'
})
</script>

<style lang="scss" scoped>
.button {
  border-radius: 10px;
  background: #cccce9;
  padding: 20px 50px;
  border: none;
  color: #ffffff;
  font-weight: 800;
}
</style>
