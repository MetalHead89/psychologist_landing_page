<template>
  <div class="page-section memo-section">
    <i18n-t
      keypath="memo.title"
      tag="h2"
      scope="global"
      class="title"
    >
      <template #accent>
        <span class="accent-text">{{ $t('memo.title_accent') }}</span>
      </template>
    </i18n-t>

    <UiMemoInfoSlider />
  </div>
</template>

<script lang="ts" setup>
import UiMemoInfoSlider from '@/components/ui/Slider/MemoSlider.vue'
</script>

<style lang="scss" scoped>
.memo-section {
  padding: 8vh 0;
  scroll-margin-top: 79px;

  .title {
    text-align: center;
    padding: 0 $content-padding;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }
}
</style>
