<template>
  <div class="swiper">
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
// eslint-disable-next-line import/no-named-as-default
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface Props {
  slides?: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  slides: () => []
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let swiper = null
const isMobileScreen = ref(false)
const isShowNavigation = computed(() => !isMobileScreen.value && props.slides.length > 1)

onMounted(() => {
  swiper = new Swiper('.swiper', {
    // spaceBetween: 100,
    speed: 500,
    autoplay: {
      delay: 5000
    },
    modules: [Navigation, Pagination, Autoplay],
    navigation: isShowNavigation
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
      }
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
