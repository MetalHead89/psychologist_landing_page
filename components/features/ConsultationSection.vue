<template>
  <div class="consultation-section">
    <i18n-t
      keypath="consultation.title"
      tag="h2"
    >
      <template #accent>
        <span class="accent-text">{{ $t('consultation.title_accent') }}</span>
      </template>
    </i18n-t>

    <div class="questions">
      <UiConsultationCard
        v-for="({ title, icon}, index) in $tm('consultation.questions')"
        :key="index"
        :title="title"
        :icon="icon"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.consultation-section {
  padding: 10vh $content-padding;

  .questions {
    display: flex;
    row-gap: 20px;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (min-width: $md) {
      column-gap: 2%;
      justify-content: space-around;
    }
  }
}
</style>
