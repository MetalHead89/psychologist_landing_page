<template>
  <div class="page">
    <div class="content-wrapper">
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
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading?: boolean,
  footerSettings?: IFooterSettings
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  footerSettings: undefined
})

const isShowFooter = computed(() => {
  return props.footerSettings
})
</script>

<style lang="scss" scoped>
.page {
  padding: 20px $cms-horizontal-padding;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .content-wrapper {
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
