<template>
  <div class="page-section location-section">
    <h3 class="title">
      Где меня найти? Подробнее в видеоинструкции

      <button type="button" class="showInstructionButton" @click="handleShowInstructionButtonClick">
        здесь
      </button>
    </h3>

    <iframe
      src="https://yandex.ru/map-widget/v1/?&whatshere%5Bpoint%5D=95.711457%2C56.202441&z=17.6"
      frameborder="0"
      class="map"
    />

    <UiModalLocationInstruction v-model:is-show="isShowModalLocationInstruction" />
  </div>
</template>

<script lang="ts" setup>
const isShowModalLocationInstruction = ref(false)

const handleShowInstructionButtonClick = () => {
  isShowModalLocationInstruction.value = true
}
</script>

<style lang="scss" scoped>
.location-section {
  padding: 0 $content-padding 8vh $content-padding;

  .title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }

  .map {
    width: 100%;
    height: 400px;

    @media screen and (min-width: $md) {
      height: 600px;
    }
  }

  .showInstructionButton {
    border: none;
    background: none;
    color: $primary-color;
    cursor: pointer;
    padding: 0;
  }
}
</style>
