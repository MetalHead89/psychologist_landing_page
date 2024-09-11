<template>
  <div class="page-wrapper">
    <slot />
    <NuxtSnackbar />
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  height: 100%;
}
</style>
