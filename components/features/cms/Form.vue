<template>
  <div
    class="form-wrapper"
    @submit.prevent="$emit('submit')"
  >
    <form class="form">
      <div class="form-body">
        <slot />
      </div>

      <CmsFeaturesFormFooter
        v-if="isShowFooter"
        v-bind="footerSettings"
        :is-loading="isLoading"
      >
        <template
          v-for="slotName in Object.keys($slots)"
          #[slotName]="slotScope"
        >
          <slot :name="slotName" v-bind="slotScope" />
        </template>
      </CmsFeaturesFormFooter>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { Props as IFooterSettings } from './FormFooter.vue'

defineEmits(['submit'])

export interface Props {
  footerSettings?: IFooterSettings
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  footerSettings: undefined,
  isLoading: false
})

const isShowFooter = computed(() => {
  return props.footerSettings
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  padding: 20px $cms-horizontal-padding;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border-radius: $cms-border-radius;
    box-shadow: $cms-base-shadow;
    background: #ffffff;
    padding: $cms-horizontal-padding;
  }
}
</style>
