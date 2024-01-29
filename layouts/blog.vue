<template>
  <div class="blog">
    <NuxtLink
      :to="{ name: 'index' }"
      class="home-link fixed"
    >
      <i class="ic-arrow-left" />
      На главную
    </NuxtLink>

    <div class="header">
      <NuxtLink
        :to="{ name: 'index' }"
        class="home-link"
      >
        <i class="ic-arrow-left" />
        На главную
      </NuxtLink>
    </div>

    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog {
  padding: 60px 15px 0;

  @media screen and (min-width: $md) {
    padding: 0 200px;
  }

  .header {
    position: fixed;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    background: $primary-color;
    padding: 20px;
    top: 0;
    min-height: 60px;

    @media screen and (min-width: $md) {
      display: none;
    }
  }

  .home-link {
    color: #ffffff;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    line-height: 0.8rem;

    .ic-arrow-left {
      font-size: 30px;
    }

    &.fixed {
      position: fixed;
      color: $font-color;
      top: 30px;
      left: 10px;
    }
  }

  .content-wrapper {
    max-width: $xl;
  }
}
</style>
