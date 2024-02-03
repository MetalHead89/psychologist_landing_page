<template>
  <div class="page-section education-section">
    <h2 class="title accent-text">
      {{ $t('education.title') }}
    </h2>

    <EducationSlider @click-to-slide="handleSlideClick" />
    <EnlargedEducationSlider
      ref="enlargedEducationSliderRef"
      v-model:is-show="isShowEnlargedImage"
    />
  </div>
</template>

<script lang="ts" setup>
import EnlargedEducationSlider from '@/components/ui/Slider/EnlargedEducationSlider.vue'
import EducationSlider from '@/components/ui/Slider/EducationSlider.vue'

const isShowEnlargedImage = ref(false)
const enlargedEducationSliderRef = ref<InstanceType<typeof EnlargedEducationSlider> | null>(null)

const handleSlideClick = (index: number) => {
  isShowEnlargedImage.value = true
  if (enlargedEducationSliderRef.value) {
    enlargedEducationSliderRef.value.goToSlide(index)
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
