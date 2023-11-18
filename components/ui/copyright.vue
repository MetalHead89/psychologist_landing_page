<template>
  <div class="copyright">
    <span>
      {{ $t('ui.copyright', { years}) }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const START_YEAR = 2023
const currentYear = new Date().getFullYear()

const years = START_YEAR + (START_YEAR === currentYear ? '' : `-${currentYear}`)
</script>

<style lang="scss" scoped>
.copyright {
  font-size: 0.8rem;
}
</style>
