<template>
  <div class="empty-list-stub">
    <img
      src="/images/empty_list_stub.jpg"
      class="image"
    />

    <h2 v-if="title" class="title">
      {{ title }}
    </h2>

    <div v-if="subtitle" class="subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title?: string,
  subtitle?: string
}

withDefaults(defineProps<IProps>(), {
  title: 'Упс!',
  subtitle: 'На данный момент здесь нет ни одной записи, но они скоро появятся!'
})
</script>

<style lang="scss" scoped>
.empty-list-stub {
  display: flex;
  flex-direction: column;
  align-items: center;

  .image {
    width: 100%;
    max-width: 300px;
  }

  .title {
    margin: 20px 0;
    text-align: center;
  }

  .subtitle {
    color: $font-color-light;
    text-align: center;
  }
}
</style>
