<template>
  <div class="education-card">
    <NuxtImg
      :src="path"
      sizes="400px sm:500"
      format="webp"
      :alt="$t('ui.education_card.alt')"
      class="image"
    />
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  image: string
}

const props = defineProps<Props>()

const path = computed(() => {
  return `/images/education/${props.image}.jpg`
})
</script>

<style lang="scss" scoped>
.education-card {
  width: 80%;

  @media screen and (min-width: $md) {
    width: 49%;
  }

  @media screen and (min-width: $lg) {
    width: 32%;
  }

  .image {
    width: 100%;
  }
}
</style>
