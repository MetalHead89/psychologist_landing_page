<template>
<div class="star-rating">
  <i
    v-for="star in starsCount"
    :key="star"
    :class="getStarClasses(star)"
    @mouseenter="handleStarMouseEnter(star)"
    @mouseleave="handleStarMouseleave"
    @click="handleStarClick(star)"
  />
</div>
</template>

<script lang="ts" setup>
const DEFAULT_STARS_COUNT = 5

export interface Props {
  starsCount?: number
  isReadonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  starsCount: DEFAULT_STARS_COUNT,
  isReadonly: false
})

const rating = defineModel<number>('rating', { default: 0 })
const highlightedStars = ref(0)

const getStarClasses = (star: number) => {
  return [
    'star',
    (
      star <= highlightedStars.value ||
        (!highlightedStars.value && star <= rating.value)
    ) ? 'ic-star' : 'ic-star-outline',
    props.isReadonly && 'star_is-readonly'
  ]
}

const handleStarMouseEnter = (star: number) => {
  if (props.isReadonly) {
    return
  }

  highlightedStars.value = star
}

const handleStarMouseleave = () => {
  if (props.isReadonly) {
    return
  }

  highlightedStars.value = 0
}

const handleStarClick = (star: number) => {
  if (props.isReadonly) {
    return
  }

  rating.value = star
}
</script>

<style lang="scss" scoped>
.star-rating {
  display: flex;
  flex-wrap: wrap;

  .star {
    color: $primary-color;
    font-size: 45px;
    cursor: pointer;

    &_is-readonly {
      pointer-events: none;
      cursor: default;
    }
  }
}
</style>
