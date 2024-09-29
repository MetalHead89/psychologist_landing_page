<template>
  <CmsFeaturesPage>
    <div class="feedback-page">
      <div class="filters-wrapper">
        <FeedbackFilters v-model="activeFilter" />
      </div>

      <div
        v-if="isLoaded && !feedbacks.length"
        class="no-list-stub"
      >
        По вашему запросу ничего не найдено
      </div>

      <div v-else class="cards">
        <FeedbackCard
          v-for="feedback in feedbacks"
          :key="feedback.id"
          v-bind="feedback"
          @updated="handleFeedbackUpdated"
        />
      </div>
    </div>
  </CmsFeaturesPage>
</template>

<script lang="ts" setup>
import FeedbackCard from '@/components/features/cms/Feedback/FeedbackCard.vue'
import FeedbackFilters from '@/components/features/cms/Feedback/FeedbackFilters.vue'
import { FEEDBACK_FILTERS } from '@/shared/constants'

definePageMeta({
  layout: 'cms'
})

const { $api } = useNuxtApp()
const loadingOverlay = useLoadingOverlayStore()

const feedbacks = ref<TFeedbackModel[]>([])
const activeFilter = ref(FEEDBACK_FILTERS.all)
const isLoaded = ref(false)

onMounted(() => {
  loadingOverlay.setIsShow(true)
  loadFeedbacks()
})

watch(activeFilter, () => {
  loadFeedbacks()
})

const loadFeedbacks = () => {
  const params = {
    ...(activeFilter.value === FEEDBACK_FILTERS.all ? {} : { status: activeFilter.value })
  }
  $api.feedback.get(params)
    .then(data => {
      feedbacks.value = data
    })
    .finally(() => {
      isLoaded.value = true
      loadingOverlay.setIsShow(false)
    })
}

const handleFeedbackUpdated = (newFeedbackItem: TFeedbackModel) => {
  const mustBeFiltered = (
    (activeFilter.value === FEEDBACK_FILTERS.forModeration && !newFeedbackItem.isForModeration) ||
    (activeFilter.value === FEEDBACK_FILTERS.approved && !newFeedbackItem.isShowed) ||
    (activeFilter.value === FEEDBACK_FILTERS.rejected && !newFeedbackItem.isForModeration && newFeedbackItem.isShowed)
  )

  feedbacks.value = mustBeFiltered ?
    feedbacks.value.filter(({ id }) => id !== newFeedbackItem.id) :
    feedbacks.value.map(feedback => feedback.id === newFeedbackItem.id ? newFeedbackItem : feedback)
}
</script>

<style lang="scss" scoped>
.feedback-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .filters-wrapper {
    margin-bottom: 30px;
  }

  .no-list-stub {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (min-width: $sm) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
}
</style>
