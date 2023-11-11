<!-- eslint-disable max-len -->
<template>
  <div class="memo-section">
    <i18n-t
      keypath="memo.title"
      tag="h2"
    >
      <template #accent>
        <span class="accent-text">{{ $t('memo.title_accent') }}</span>
      </template>
    </i18n-t>

    <div class="mems">
      <UiMemoBlock
        v-for="({ title, items }, index) in $tm('memo.mems')"
        :key="index"
        :title="title"
        :items="itemsToArray(items)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const itemsToArray = (items: { [prop: string]: string }) => {
  const arrayItems: string[] = []

  Object.keys(items).forEach(key => {
    arrayItems.push(items[key])
  })

  return arrayItems
}
</script>

<style lang="scss" scoped>
.memo-section {
  padding: 8vh $content-padding;
  scroll-margin-top: 79px;

  .title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }

  .mems {
    display: flex;
    flex-direction: column;
    gap: 50px;

    @media screen and (min-width: $md) {
      gap: 8vh;
    }
  }
}
</style>
