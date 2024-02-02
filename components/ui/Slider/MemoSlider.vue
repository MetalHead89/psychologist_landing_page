<template>
  <UiBaseSlider
    :slides="mems"
    swiper-class="memo-slider"
  >
    <template #slide="{ title, items }: TSlide">
      <div class="swiper-slide">
        <div class="content">
          <div class="mems">
            <UiMemoBlock
              :title="title"
              :items="items"
            />
          </div>
        </div>
      </div>
    </template>
  </UiBaseSlider>
</template>

<script setup lang="ts">
import UiBaseSlider from './BaseSlider.vue'

const { t } = useI18n()

const mems = [
  {
    title: t('memo.mems.expectations.title'),
    items: [
      t('memo.mems.expectations.items.one'),
      t('memo.mems.expectations.items.two'),
      t('memo.mems.expectations.items.three')
    ]
  },
  {
    title: t('memo.mems.don_t_expect.title'),
    items: [
      t('memo.mems.don_t_expect.items.one'),
      t('memo.mems.don_t_expect.items.two'),
      t('memo.mems.don_t_expect.items.three')
    ]
  },
  {
    title: t('memo.mems.clients_advice.title'),
    items: [
      t('memo.mems.clients_advice.items.one'),
      t('memo.mems.clients_advice.items.two'),
      t('memo.mems.clients_advice.items.three')
    ]
  }
]

type TSlide = { title: string, items: string[] }
</script>

<style lang="scss" scoped>
.memo-slider {
  .swiper-slide {
    display: flex;
    justify-content: center;
    height: unset;
  }

  .content {
    border: 1px solid $primary-color;
    border-radius: $base-border-radius;
    padding: 30px;
    margin: 0 30px;
    max-width: 500px;

    @media screen and (min-width: $md) {
      margin: 0 $content-padding;
      align-items: flex-start;
      padding: 30px 60px 60px;
      max-width: unset;
    }
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
      color: $primary-color;
  }

  :deep(.swiper-pagination) {
    bottom: 12px;

    .swiper-pagination-bullet {
      background: $primary-color;
    }
  }
}
</style>
