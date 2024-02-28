<template>
  <UiBaseSlider
    :slides="slides"
    :options="options"
    :swiper-class="swiperClass"
  >
    <template #slide="{ image }: TSlide">
      <div class="swiper-slide">
        <div class="content swiper-zoom-container">
          <picture class="picture" @click="handlePictureClick">
            <source :srcset="useAssetImage(`/images/webp${image}.webp`)" class="education-image" />
            <img :src="useAssetImage(`/images/jpg${image}.jpg`)" class="education-image" />
          </picture>
        </div>
      </div>
    </template>
  </UiBaseSlider>
</template>

<script setup lang="ts">
import type Swiper from 'swiper/types/swiper-class'
import UiBaseSlider from './BaseSlider.vue'

type TSlide = { image: string }

export interface Props {
customOptions?: object,
currentSlide?: number,
swiperClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  customOptions: () => ({}),
  currentSlide: 0,
  swiperClass: 'education-slider'
})

const emit = defineEmits(['click-to-slide'])

const swiper = ref<Swiper | null>(null)

const options = {
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
  },

  ...props.customOptions
}

const slides = [
  { image: '/education/education_image_8' },
  { image: '/education/education_image_1' },
  { image: '/education/education_image_2' },
  { image: '/education/education_image_3' },
  { image: '/education/education_image_4' },
  { image: '/education/education_image_5' },
  { image: '/education/education_image_6' },
  { image: '/education/education_image_7' }
]

const handlePictureClick = () => {
  if (swiper.value) {
    emit('click-to-slide', swiper.value.clickedIndex)
  }
}

defineExpose({
  swiper
})
</script>

<style lang="scss" scoped>
.swiper {
  .education-image {
    // width: 100%;
    max-height: 263px;
    cursor: pointer;
  }

  .picture {
    display: block;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
      color: $primary-color;
      transition: transform .3s ease;
  }

  :deep(.swiper-button-prev) {
      transform: translateX(-130%);
  }

  :deep(.swiper-button-next) {
      transform: translateX(130%);
  }

  :deep(.swiper-pagination) {
    bottom: 12px;
    opacity: 0;
    transition: opacity .3s ease;

    .swiper-pagination-bullet {
      background: $primary-color;
    }
  }

  &:hover {
    :deep(.swiper-button-prev) {
      transform: translateX(0);
    }

    :deep(.swiper-button-next) {
        transform: translateX(0);
    }

    :deep(.swiper-pagination) {
      opacity: 1;
    }
  }
}
</style>
