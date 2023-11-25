<template>
  <div class="education-card">
    <NuxtImg
      :src="path"
      :alt="$t('ui.education_card.alt')"
      class="image"
      format="avif"
      loading="lazy"
      sizes="800px 2xl:1000px"
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
