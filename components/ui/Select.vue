<template>
  <UiControlWrapper :error-key="errorKey">
    <VueMultiselect
      :model-value="selected"
      v-bind="$attrs"
      :options="options"
      :label="showBy"
      :track-by="trackBy"
      :placeholder="placeholder"
      :show-labels="false"
      :class="classes"
      :multiple="isMultiple"
      @update:model-value="handleSelectInput"
    >
      <template #noResult>
        <slot name="noResult">
          <span>
            {{ $t('ui.select.no_result') }}
          </span>
        </slot>
      </template>

      <template #tag>
        <slot name="tag" />
      </template>

      <template #selection="slotProps: TSelectSelectedSlotProps">
        <slot name="selection" v-bind="slotProps" />
      </template>
    </VueMultiselect>
  </UiControlWrapper>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'

export default {
  components: { VueMultiselect }
}
</script>

<script setup lang="ts">
const BASE_CLASS = 'select'

export interface Props {
  modelValue: string | string[],
  options: TAnyObject[],
  isMultiple?: boolean,
  placeholder?: string,
  trackBy?: string,
  showBy?: string,
  errorKey?: string,
  disabled?: boolean
}

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits([
  'update:model-value'
])

const props = withDefaults(defineProps<Props>(), {
  isMultiple: false,
  placeholder: '',
  trackBy: 'id',
  showBy: 'title',
  errorKey: '',
  disabled: false
})

const selected = computed(() => {
  if (props.isMultiple) {
    return props.options.filter(option => props.modelValue.includes(option[props.trackBy]))
  }

  return props.options.find(option => option[props.trackBy] === props.modelValue)
})

const classes = computed(() => {
  return [
    BASE_CLASS,
    props.disabled && `${BASE_CLASS}_is-disabled`
  ]
})

const handleSelectInput = (value: TAnyObject | TAnyObject[]) => {
  if (Array.isArray(value)) {
    emit('update:model-value', value.map(item => item[props.trackBy]) || [])
    return null
  }

  emit('update:model-value', value ? value[props.trackBy] : '')
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss" scoped>
:deep(.select) {
  font-family: $primary-font;
  font-size: $base-font-size;
  line-height: $base-line-height;
  position: relative;
  outline: none;
  transition: outline .2s ease-in;
  border-radius: $base-border-radius;
  outline: 2px solid transparent;
  cursor: pointer;

  .multiselect__tags {
    border: none;
    border-radius: $base-border-radius;
    padding: $control-padding;
    background: $primary-background;
    font-family: $primary-font;
    font-size: $base-font-size;
    line-height: $base-line-height;
  }

  .multiselect__content-wrapper {
    margin: 5px 0;
    border: none;
    outline: 2px solid $primary-color;
    border-radius: $base-border-radius;
  }

  .multiselect__option--highlight {
    background-color: lighten($primary-color, 20);
    color: $font-color;
  }

  .multiselect__option--selected {
    background-color: $primary-color;
    color: white;
    font-weight: normal;
  }

  .multiselect__input,
  .multiselect__placeholder,
  .multiselect__single {
    font-size: $base-font-size;
    padding: 0;
    margin: 0;
    line-height: $base-line-height;
    background: $primary-background;
    color: $font-color;
  }

  .multiselect__placeholder {
    color: $placeholder-color;
  }

  .multiselect__select {
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  &.multiselect--active {
    outline: 2px solid $primary-color;
    border-radius: $base-border-radius;

    .multiselect__select {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &:hover {
    outline: 2px solid $primary-color;
  }
}

// :deep(.select_is-disabled) {
//   pointer-events: none;

//   .multiselect__tags {
//     border-color: $disabled-input-background-color;
//     background: $disabled-input-background-color;
//   }

//   .multiselect__select {
//     display: none;
//   }
// }
</style>
