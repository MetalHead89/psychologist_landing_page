<template>
  <div :class="classes">
    <div class="swiper-wrapper">
      <slot name="slides">
        <slot
          v-for="(slide, index) in slides"
          :key="index"
          name="slide"
          v-bind="slide"
        />
      </slot>
    </div>
    <div v-if="!isMobileScreen" class="swiper-pagination" />

    <div v-if="isShowNavigation" class="swiper-button-prev" />
    <div v-if="isShowNavigation" class="swiper-button-next" />
  </div>
</template>

<script setup lang="ts">
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slides?: Array<any>,
  options?: object,
  swiperClass: string
}

const BASE_CLASS = 'swiper'

const props = withDefaults(defineProps<Props>(), {
  slides: () => [],
  options: () => ({})
})

const classes = computed(() => {
  return [
    BASE_CLASS,
    props.swiperClass
  ]
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let swiper = null
const isMobileScreen = ref(false)
const isShowNavigation = computed(() => !isMobileScreen.value && props.slides.length > 1)

onMounted(() => {
  swiper = new Swiper(`.${props.swiperClass}`, {
    speed: 500,
    autoplay: {
      delay: 5000
    },
    modules: [Navigation, Pagination, Autoplay],
    navigation: isShowNavigation.value
      ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
      : false,
    pagination: isMobileScreen.value
      ? false
      : {
        el: '.swiper-pagination',
        clickable: true
      },
    ...props.options
  })
})

onMounted(() => {
  setScreenType()
  window.addEventListener('resize', setScreenType)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScreenType)
})

const setScreenType = () => {
  isMobileScreen.value = window.matchMedia('(max-width: 768px)').matches
}
</script>

<style lang="scss" scoped>
.swiper {
  :deep(.swiper-pagination-bullet) {
    background: #ffffff;
  }
  :deep(.swiper-pagination-bullet-active) {
    background: #ffffff;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    color: #ffffff
  }
}
</style>
