<template>
  <CmsUiCard :class="classes">
    <div class="status-section">
      <UiStarRating
        class="rating"
        :rating="props.rating"
        is-readonly
      />

      <div
        v-if="props.isForModeration"
        class="for-moderation-indicator"
      >
        На модерации
      </div>

      <CmsUiIconButton
        :icon="StatueButtonIcon"
        class="status-button"
        @click="handleStatueButtonClick"
      />
    </div>

    <div class="name">
      {{ props.name }}
    </div>

    <CmsUiScrollBar>
      <div class="feedback">
        {{ props.feedback }}
      </div>
    </CmsUiScrollBar>
  </CmsUiCard>
</template>

<script lang="ts" setup>
interface IProps {
  id: string;
  name: string;
  rating: number;
  feedback: string;
  isForModeration?: boolean;
  isShowed?: boolean;
}

const props = defineProps<IProps>()

const { $api } = useNuxtApp()
const loadingOverlay = useLoadingOverlayStore()
const emit = defineEmits(['updated'])

const StatueButtonIcon = computed(() => {
  return props.isShowed
    ? 'ic-eye-outline'
    : 'ic-eye-off-outline'
})

const classes = computed(() => {
  return [
    'feedback-card',
    !props.isShowed && 'feedback-card_is-hidden',
    props.isForModeration && 'feedback-card_is-for-moderation'
  ]
})

const handleStatueButtonClick = () => {
  loadingOverlay.setIsShow(true)

  $api.feedback.update(props.id, { isShowed: !props.isShowed })
    .then(feedback => {
      emit('updated', feedback)
    })
    .finally(() => {
      loadingOverlay.setIsShow(false)
    })
}
</script>

<style lang="scss" scoped>
.feedback-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 155px;
  background: #66a33d12;
  border: 1px solid #66a33d;

  @media screen and (min-width: $sm) {
    width: calc(100% / 2 - 10px);
  }

  @media screen and (min-width: $md) {
    width: initial;
    max-width: 450px;
    flex-grow: 1;
    flex-basis: 0;
  }

  .status-section {
    display: flex;
    align-items: center;
  }

  .for-moderation-indicator {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-right: auto;
    font-size: 12px;
    background: #ffd760;
    padding: 1px 7px;
    border-radius: $cms-border-radius;
  }

  .name {
    font-weight: 700;
    font-size: 17px;
  }

  .status-button {
    margin-left: auto;
  }

  .rating {
    :deep(.star) {
      font-size: 16px;
    }
  }

  .feedback {
    font-size: 15px;
    overflow-y: auto;
  }

  &_is-hidden {
    background: #6e6e6e12;
    border: 1px solid #6e6e6e;
  }

  &_is-for-moderation {
    background: #ffd76012;
    border: 1px solid #ffd760;
  }
}
</style>
