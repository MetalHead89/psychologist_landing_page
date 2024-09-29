<template>
  <div class="radio-group">
    <label
      v-for="{ id, name } in options"
      :key="id"
      :class="['option', model === id && 'option_is-active']"
    >
      <input
        type="radio"
        class="radio"
        :value="id"
        :checked="model === id"
        @click="handleRadioClick(id)"
      />
      <slot name="option" v-bind="{ id, name, isActive: model === id }">
        {{ name }}
      </slot>
    </label>
  </div>
</template>

<script lang="ts" setup>

const model = defineModel<string | number>()

defineProps({
  options: {
    type: Array,
    default: () => []
  }
})

const handleRadioClick = id => {
  if (model.value === id) {
    return
  }

  model.value = id
}
</script>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .option {
    cursor: pointer;
  }

  .radio {
    display: none;
  }
}
</style>
