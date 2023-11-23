<template>
  <div class="education-card">
    <NuxtImg
      :src="path"
      format="avif"
      quality="30"
      :alt="$t('ui.education_card.alt')"
      class="image"
      loading="lazy"
    />
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  image: string
}

const props = defineProps<Props>()

const path = computed(() => {
  // const assets = import.meta.glob('@/assets/images/education/*', {
  //   eager: true,
  //   import: 'default'
  // })

  // return assets[`/assets/images/education/${props.image}.jpg`] as string
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
