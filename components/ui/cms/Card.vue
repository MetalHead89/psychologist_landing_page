<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: $cms-border-radius;
  box-shadow: $cms-base-shadow;
  padding: $cms-horizontal-padding;
}
</style>
