<template>
  <div class="skill-card">
    <h3 class="title">
      {{ title }}
    </h3>

    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
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
</script>

<style lang="scss" scoped>
  .skill-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #ffffff;
    border-radius: 20px;
    padding: 50px;
    width: 100%;
  }

  .title {
    margin-top: 0;
  }

  .text {
    font-size: 14px;
    text-align: center;
    color: #7c7c7c;
  }
</style>
