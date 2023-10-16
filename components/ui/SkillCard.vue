<template>
  <div class="skill-card">
    <h3 class="title">
      {{ title }}
    </h3>

    <div
      v-tooltip="{
        content: text,
        html: true,
        popperClass: 'skill-description',
        triggers: ['hover', 'click'],
        positioningDisabled: isMobileScreen
      }"
      class="ic-help-circle"
    />
  </div>
</template>

<script lang="ts" setup>
const isMobileScreen = ref(false)

defineProps({
  title: {
    type: String,
    default: ''
  },

  text: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  setScreenType()
  window.addEventListener('resize', setScreenType)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScreenType)
})

const setScreenType = () => {
  isMobileScreen.value = window.matchMedia('(max-width: 768px)').matches
}
</script>

<style lang="scss" scoped>
  .skill-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #ffffff;
    border-radius: 20px;
    padding: 20px;
    min-height: 150px;
    width: 100%;

    .skill-description {
      max-width: 300px;
    }
  }

  .ic-help-circle {
    color: $primary-color;
  }

  .text {
    font-size: 14px;
    text-align: center;
    color: #7c7c7c;
  }
</style>

<style lang="scss">
.skill-description {
  max-width: 700px;

  @media screen and (max-width: $md) {
    position: fixed;
    bottom: 0;
    top: auto;
    opacity: 1;

    .v-popper__inner {
      background: #ffffff;
      color: $font-color;
      width: 100%;
      padding: 30px;
      border-radius: 30px 30px 0 0;
      box-shadow: 0px -8px 40px -17px #00000035;
    }
  }
}
</style>
