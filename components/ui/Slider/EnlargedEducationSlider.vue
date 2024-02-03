<template>
  <div class="enlarged-education-slider">
    <Transition name="overlay-fade">
      <div v-if="isShow" class="overlay" @click="handleCloseClick">
        <button class="close" @click="handleCloseClick">
          <div class="ic-close" />
        </button>
      </div>
    </Transition>

    <Transition name="education-slider-fade">
      <div class="slider-wrapper">
        <EducationSlider
          v-if="isShow"
          ref="educationSliderRef"
          :is-clickable="false"
          :custom-options="sliderOptions"
          swiper-class="education-slider_enlarged"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination, Zoom } from 'swiper/modules'
import EducationSlider from '@/components/ui/Slider/EducationSlider.vue'

const educationSliderRef = ref<InstanceType<typeof EducationSlider> | null>(null)

export interface Props {
  isShow?: boolean
}

withDefaults(defineProps<Props>(), {
  isShow: false
})

const emit = defineEmits(['update:is-show'])

const sliderOptions = {
  modules: [Navigation, Pagination, Autoplay, Zoom],
  breakpoints: false,
  slidesPerView: 1,
  autoplay: false,
  zoom: true
}

const handleCloseClick = () => {
  emit('update:is-show', false)
}

const goToSlide = (index: number) => {
  nextTick(() => {
    educationSliderRef.value?.swiper?.slideTo(index, 0)
  })
}

defineExpose({
  goToSlide
})
</script>

<style lang="scss" scoped>
.enlarged-education-slider {
  position: fixed;
  z-index: 200;

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000000b9;
    cursor: pointer;

    .close {
      padding: 0;
      margin: 0;
      display: flex;
      color: #ffffff;
      background: none;
      border: none;
      cursor: pointer;
      position: fixed;
      top: 20px;
      right: 20px;
      font-size: 30px;
    }
  }

  .slider-wrapper {
    position: fixed;
    left: 50%;
    width: 100%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: $lg;
  }

  :deep(.education-image) {
    max-height: 100vh;
    cursor: default;
    object-fit: contain;
  }

  .overlay-fade-enter-active,
  .overlay-fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .overlay-fade-enter-from,
  .overlay-fade-leave-to {
    opacity: 0;
  }

  .education-slider-fade-enter-active,
  .education-slider-fade-leave-active {
    transition: all 0.3s ease;
  }

  .education-slider-fade-enter-from,
  .education-slider-fade-leave-to {
    transform: translate(-50%, -50%) scale(0);
  }
}
</style>
