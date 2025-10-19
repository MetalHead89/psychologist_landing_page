<template>
  <UiBaseSlider
    :slides="reviews"
    :options="options"
    swiper-class="reviews-slider"
  >
    <template #slide="slide ">
      <div class="swiper-slide">
        <FeedbackCard v-bind="slide" class="card" />
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
  slidesPerView: 'auto',

  // breakpoints: {
  //   768: {
  //     slidesPerView: 2
  //   },

  //   1024: {
  //     slidesPerView: 3
  //   },

  //   1920: {
  //     slidesPerView: 4
  //   }
  // },

  on: {
    init: (swiperRef: Swiper) => {
      swiper.value = swiperRef
    }
  }
}
</script>

<style lang="scss" scoped>
.reviews-slider {
  .swiper-slide {
    width: 357px;
  }

  .card {
    flex-shrink: 0;
    width: 100%;
    height: 350px;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    color: #a4a4a4
  }
}
</style>
