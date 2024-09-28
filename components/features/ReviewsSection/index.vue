<template>
  <div v-if="reviews.length" class="reviews-section">
    <h2 class="title accent-text">
      Отзывы клиентов
    </h2>

    <UiReviewsSlider :reviews="reviews" />
  </div>
</template>

<script lang="ts" setup>
import UiReviewsSlider from './ReviewsSlider.vue'

const { $api } = useNuxtApp()
const reviews = ref<TFeedbackModel[]>([])

onMounted(() => {
  $api.feedback.getAllowedReviews()
    .then(data => {
      reviews.value = data
    })
})
</script>

<style lang="scss" scoped>
.reviews-section {
  padding: 40px $content-padding;

  .title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }
}
</style>
