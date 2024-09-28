<template>
  <div class="review-card">
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
  height: 155px;
  border: 1px solid $primary-color;
  border-radius: $base-border-radius;
  padding: 20px;

  .feedback-wrapper {
    flex-grow: 1;
  }

  .name {
    margin-left: auto;
    font-style: italic;
  }

  .rating {
    :deep(.star) {
      font-size: 35px;
    }
  }
}
</style>
