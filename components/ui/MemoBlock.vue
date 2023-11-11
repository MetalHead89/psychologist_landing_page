<template>
  <div class="memo-block">
    <h3 class="title">
      {{ title }}
    </h3>

    <div class="cards">
      <UiMemoCard
        v-for="(text, index) in items"
        :key="index"
        :number="index + 1"
        :text="text"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  title?: string,
  items: string[]
}

withDefaults(defineProps<Props>(), {
  title: ''
})
</script>

<style lang="scss" setup>
.memo-block {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    text-align: center;
    margin-bottom: 30px;

    @media screen and (min-width: $md) {
      margin-bottom: 4vh;
    }

    @media screen and (min-width: $xl) {
      font-size: 1.1vw;
    }
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media screen and (min-width: $md) {
      flex-direction: row;
      justify-content: space-between;
      gap: unset;
      width: 100%;
    }
  }
}
</style>
