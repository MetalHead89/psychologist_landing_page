<template>
  <Toggle v-bind="$attrs" />
</template>

<script lang="ts" setup>
import Toggle from '@vueform/toggle'
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style lang="scss">
.toggle-container {
  --toggle-bg-on: #84c563;
  --toggle-border-on: #84c563;
}
</style>
