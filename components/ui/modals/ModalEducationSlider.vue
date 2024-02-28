<template>
  <UiBaseModal v-bind="$attrs">
    <template #window>
      <EducationSlider
        ref="educationSliderRef"
        :is-clickable="false"
        :custom-options="sliderOptions"
        swiper-class="education-slider_enlarged"
      />
    </template>
  </UiBaseModal>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination, Zoom } from 'swiper/modules'

import EducationSlider from '@/components/ui/Slider/EducationSlider.vue'

defineOptions({
  inheritAttrs: false
})

const educationSliderRef = ref<InstanceType<typeof EducationSlider> | null>(null)

const sliderOptions = {
  modules: [Navigation, Pagination, Autoplay, Zoom],
  breakpoints: false,
  slidesPerView: 1,
  autoplay: false,
  zoom: true
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
.modal-wrapper {
  :deep(.window) {
    width: 100%;
    max-width: $lg;
  }
}

.education-slider_enlarged {
  :deep(.education-image) {
    max-height: 100vh;
    cursor: default;
    object-fit: contain;
  }

  :deep(.picture) {
    max-height: 100vh;
  }
}
</style>
