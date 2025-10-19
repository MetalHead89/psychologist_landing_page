<template>
  <!-- v-if="reviews.length"  -->
  <div class="articles-section">
    <h2 class="title accent-text">
      Статьи
    </h2>

    <ArticlesSlider :items="data?.articles || []" />

    <!-- <UiReviewsSlider :reviews="reviews" /> -->

    <UiButton
      type="button"
      class="button"
      @click="router.push('/articles')"
    >
      Все статьи
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
import ArticlesSlider from './Slider.vue'
const router = useRouter()

const { $api } = useNuxtApp()

const { data } = useAsyncData(
  'articles',
  () => $api.articles.getPublicList(),
  {
    server: true,
    lazy: true
  }
)
// const reviews = ref<TFeedbackModel[]>([])

// onMounted(() => {
//   $api.feedback.getAllowedReviews()
//     .then(data => {
//       reviews.value = data
//     })
// })
</script>

<style lang="scss" scoped>
.articles-section {
  padding: 40px $content-padding;

  .title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }

  .button {
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
