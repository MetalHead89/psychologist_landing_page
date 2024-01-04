<template>
  <div class="education-card">
    <NuxtImg
      :src="path"
      sizes="350px 2xl:800px"
      format="avif"
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
  width: 100%;
  max-width: 350px;

  @media screen and (min-width: $sm) {
    width: 80%;
  }

  @media screen and (min-width: $md) {
    width: 49%;
  }

  @media screen and (min-width: $lg) {
    width: 32%;
    max-width: unset;
  }

  .image {
    width: 100%;
  }
}
</style>
