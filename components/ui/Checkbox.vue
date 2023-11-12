<template>
  <UiControlWrapper :error-key="errorKey">
    <label :class="classes">
      <input
        v-model="model"
        type="checkbox"
        v-bind="$attrs"
        class="check-input"
      >
      <div class="box">
        <div class="check" />
      </div>
      <slot>
        <span class="label">{{ label }}</span>
      </slot>
    </label>
  </UiControlWrapper>
</template>

<script lang="ts" setup>
const BASE_CLASS = 'checkbox'

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits(['update:model-value'])

export interface Props {
  modelValue: boolean,
  label?: string
  errorKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  errorKey: '',
  label: ''
})

const model = computed({
  get() {
    return props.modelValue
  },

  set(value) {
    emit('update:model-value', value)
  }
})

const classes = computed(() => {
  return [
    BASE_CLASS,
    props.modelValue && `${BASE_CLASS}_is-checked`
  ]
})
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: color .4s ease;
  color: $font-color;
  cursor: pointer;

  @media screen and (min-width: $xl) {
    gap: 0.5vw;
  }

  .check-input {
    display: none;
  }

  .box {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid $font-color;
    border-radius: 5px;
    transition: background .1s ease, border-color .4s ease;

    @media screen and (min-width: $xl) {
      width: 1.1vw;
      height: 1.1vw;
      border: 0.1vw solid $font-color;
      border-radius: 0.3vw;
    }

    .check {
      width: 4px;
      height: 10px;
      opacity: 0;
      transform: rotate(45deg) scale(0);
      border-right: 2px solid white;
      border-bottom: 2px solid white;
      transition: all .3s ease;
      transition-delay: .15s;
      margin-bottom: 2px;

      @media screen and (min-width: $xl) {
        width: 0.2vw;
        height: 0.5vw;
        border-right: 0.15vw solid white;
        border-bottom: 0.15vw solid white;
        margin-bottom: 0.15vw;
      }
    }
  }

  &_is-checked {
    color: $primary-color;

    .box {
      border-color: transparent;
      background: $primary-color;
      animation: jelly .6s ease;

      .check {
        opacity: 1;
        transform: rotate(45deg) scale(1);
      }
    }
  }
}

@keyframes jelly {
  from {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.25, 0.75);
  }
  40% {
    transform: scale(0.75, 1.25);
  }
  50% {
    transform: scale(1.15, 0.85);
  }
  65% {
    transform: scale(.95, 1.05);
  }
  75% {
    transform: scale(1.05, .95);
  }
  to {
    transform: scale(1, 1);
  }
}
</style>
