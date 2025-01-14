<template>
  <div class="articles-wrapper">
    <!-- <UiArticlesHeader /> -->

    <div class="content">
      <slot />
    </div>

    <FeaturesFooter />
  </div>
</template>

<style lang="scss" scoped>
.articles-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
