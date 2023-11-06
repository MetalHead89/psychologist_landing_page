<template>
  <div
    id="education-section"
    class="education-section"
  >
    <h2 class="about-me__title accent-text">
      {{ $t('education.title') }}
    </h2>

    <div class="cards">
      <UiEducationCard
        v-for="(card, index) in cards"
        :key="index"
        :image="card"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const cards = [
  'education_1',
  'education_2',
  'education_3',
  'education_4'
]
</script>

<style lang="scss" scoped>
.education-section {
  padding: 10vh $content-padding;
  position: relative;
  scroll-margin-top: 79px;

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 3vh;

    @media screen and (min-width: $md) {
      column-gap: 2%;
    }
  }
}
</style>
