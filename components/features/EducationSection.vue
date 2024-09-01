<template>
  <div class="page-section education-section">
    <h2 class="title accent-text">
      {{ $t('education.title') }}
    </h2>

    <EducationSlider @click-to-slide="handleSlideClick" />

    <UiModalEducationSlider
      ref="ModalEducationSliderRef"
      v-model:is-show="isShowModalEducationSlider"
    />
  </div>
</template>

<script lang="ts" setup>
import type ModalEducationSlider from '@/components/ui/modals/ModalEducationSlider.vue'
import EducationSlider from '@/components/ui/Slider/EducationSlider.vue'

const isShowModalEducationSlider = ref(false)
const ModalEducationSliderRef = ref<InstanceType<typeof ModalEducationSlider> | null>(null)

const handleSlideClick = (index: number) => {
  isShowModalEducationSlider.value = true

  if (ModalEducationSliderRef.value) {
    ModalEducationSliderRef.value.goToSlide(index)
  }
}
</script>

<style lang="scss" scoped>
.education-section {
  padding: 0 $content-padding;

  .title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }
}
</style>
