<template>
  <div class="review-card">
    <div class="ic-quotes-right quotes" />
    <UiStarRating
      class="rating"
      :rating="rating"
      is-readonly
    />

    <CmsUiScrollBar class="feedback-wrapper">
      <div class="feedback">
        {{ props.feedback }}
      </div>
    </CmsUiScrollBar>

    <div class="name">
      {{ props.name }}
    </div>
  </div>
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
</script>

<style lang="scss" scoped>
.review-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 190px;
  border: 1px solid #ededed;
  border-radius: $base-border-radius;
  padding: 20px;
  margin: 1px 0;

  .feedback-wrapper {
    flex-grow: 1;
  }

  .name {
    margin-left: auto;
    margin-top: 10px;
    font-style: italic;
  }

  .rating {
    :deep(.star) {
      font-size: 35px;
    }
  }

  .quotes {
    position: absolute;
    // font-size: 100px;
    opacity: 0.05;
    top: 40px;
    left: 30px;
    font-size: 120px;
    // top: 0;
    // right: 20px;
  }
}
</style>
