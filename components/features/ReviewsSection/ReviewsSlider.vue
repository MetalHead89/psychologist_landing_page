<template>
  <UiBaseSlider
    :slides="$props.reviews"
    :options="options"
    swiper-class="reviews-slider"
  >
    <template #slide="slide ">
      <div class="swiper-slide">
        <FeedbackCard v-bind="slide" />
      </div>
    </template>
  </UiBaseSlider>
</template>

<script setup lang="ts">
import type Swiper from 'swiper/types/swiper-class'
import UiBaseSlider from '@/components/ui/Slider/BaseSlider.vue'
import FeedbackCard from './ReviewCard.vue'

withDefaults(defineProps<{ reviews: TFeedbackModel[]}>(), {
  reviews: () => []
})

const swiper = ref<Swiper | null>(null)

const options = {
  autoplay: false,
  spaceBetween: 30,

  breakpoints: {
    768: {
      slidesPerView: 2
    },

    1024: {
      slidesPerView: 3
    },

    1920: {
      slidesPerView: 4
    }
  },

  on: {
    init: (swiperRef: Swiper) => {
      swiper.value = swiperRef
    }
  }
}
</script>
