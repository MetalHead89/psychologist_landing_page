<template>
  <div class="consultation-card">
    <i :class="`icon ic-${icon}`" />
    <h3 class="title">
      {{ title }}
    </h3>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  icon: string,
  title: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.consultation-card {
  border: 2px solid $primary-color;
  border-radius: $base-border-radius;
  padding: 30px;
  width: 100%;
  gap: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 450px;

  @media screen and (min-width: $md) {
    width: 49%;
  }

  @media screen and (min-width: $lg) {
    width: 32%;
  }

  @media screen and (min-width: $xl) {
    border: 0.13vw solid $primary-color;
    border-radius: 0.5vw;
    padding: 1.5vw;
    width: 20vw;
    max-width: unset;
  }

  .icon {
    font-size: 50px;
    color: $primary-color;

    @media screen and (min-width: $xl) {
      font-size: 2.6vw;
    }
  }

  .title {
    text-align: center;
    margin: 0;

    @media screen and (min-width: $xl) {
      font-size: 1.1vw;
    }
  }
}
</style>
