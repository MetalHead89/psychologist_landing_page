<template>
  <div class="page">
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 20px $cms-horizontal-padding;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border-radius: $cms-border-radius;
    box-shadow: $cms-base-shadow;
    background: #ffffff;
    padding: $cms-horizontal-padding;
  }
}
</style>
