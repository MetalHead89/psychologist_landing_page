<template>
  <div class="memo-card">
    <div class="number">
      {{ number }}
    </div>

    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  number: number,
  text: string
}

defineProps<Props>()
</script>

<style lang="scss" setup>
.memo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 400px;

  @media screen and (min-width: $md) {
    width: 31%;
  }

  @media screen and (min-width: $xl) {
    max-width: unset;
    font-size: 0.84vw;
  }

  .number {
    $number-size: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: $number-size;
    height: $number-size;
    background: lighten($primary-color, 10);
    border-radius: 50%;
    font-weight: 800;
    color: #ffffff;

    @media screen and (min-width: $xl) {
      $number-size: 2.5vw;

      width: $number-size;
      height: $number-size;
    }
  }

  .text {
    text-align: center;
  }
}
</style>
