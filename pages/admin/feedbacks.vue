<template>
  <CmsFeaturesPage>
    <div class="feedbacks">
      <CmsFeaturesFeedbackCard
        v-for="feedback in feedbacks"
        :key="feedback.id"
        v-bind="feedback"
        @updated="handleFeedbackUpdated"
      />
    </div>
  </CmsFeaturesPage>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cms'
})

const { $api } = useNuxtApp()
const loadingOverlay = useLoadingOverlayStore()

const feedbacks = ref<TFeedbackModel[]>([])

onMounted(() => {
  loadingOverlay.setIsShow(true)

  $api.feedback.get()
    .then(data => {
      feedbacks.value = data
    })
    .finally(() => {
      loadingOverlay.setIsShow(false)
    })
})

const handleFeedbackUpdated = (newFeedbackItem: TFeedbackModel) => {
  feedbacks.value = feedbacks.value.map(feedback => {
    return feedback.id === newFeedbackItem.id ? newFeedbackItem : feedback
  })
}
</script>

<style lang="scss" scoped>
.feedbacks {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: $sm) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
