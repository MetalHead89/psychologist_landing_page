<template>
  <UiBaseSlider
    :slides="items"
    :options="options"
    swiper-class="articles-slider"
  >
    <template #slide="slide ">
      <div class="swiper-slide">
        <UiArticleCard
          class="card"
          v-bind="slide"
        />
      </div>
    </template>
  </UiBaseSlider>
</template>

<script setup lang="ts">
import type Swiper from 'swiper/types/swiper-class'
import UiBaseSlider from '@/components/ui/Slider/BaseSlider.vue'

withDefaults(defineProps<{ items: TPublicListArticleModel[]}>(), {
  items: () => []
})

const swiper = ref<Swiper | null>(null)

const options = {
  autoplay: false,
  spaceBetween: 30,
  slidesPerView: 'auto',

  breakpoints: {
    768: {
      slidesPerView: 'auto'
    },

    1024: {
      slidesPerView: 'auto'
    },

    1920: {
      slidesPerView: 'auto'
    }
  },

  on: {
    init: (swiperRef: Swiper) => {
      swiper.value = swiperRef
    }
  }
}
</script>

<style lang="scss" scoped>
.articles-slider {
  .swiper-slide {
    flex-shrink: 0;
    width: 392px;
    height: auto;
  }

  .card {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    color: #a4a4a4
  }
}
</style>
