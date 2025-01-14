<template>
  <CmsUiModal ref="modal">
    <div class="confirm-modal">
      <h2
        v-if="title"
        class="title"
      >
        {{ title }}
      </h2>

      <div v-if="subtitle"  class="subtitle">
        {{ subtitle }}
      </div>

      <div class="actions">
        <component
          :is="confirmButton"
          type="button"
          @click="handleConfirmButtonClick"
        >
          {{ confirmButtonText }}
        </component>

        <CmsUiBorderedButton @click="handleCancelButtonClick">
          {{ cancelButtonText }}
        </CmsUiBorderedButton>
      </div>
    </div>
  </CmsUiModal>
</template>

<script lang="ts" setup>
import CmsUiModal from '@/components/ui/cms/modals/BaseModal.vue'
import CmsUiButton from '@/components/ui/cms/buttons/Button.vue'
import CmsUiRemoveButton from '@/components/ui/cms/buttons/RemoveButton.vue'

interface IProps {
  title?: string,
  subtitle?: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
  confirmButtonTheme?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  subtitle: '',
  confirmButtonText: 'Да',
  cancelButtonText: 'Нет',
  confirmButtonTheme: 'primary'
})

const emit = defineEmits(['confirm'])

const modal = ref<typeof CmsUiModal | null>(null)

const handleCancelButtonClick = () => {
  modal.value?.close()
}

const handleConfirmButtonClick = () => {
  emit('confirm')
  modal.value?.close()
}

const confirmButton = computed(() => {
  return props.confirmButtonTheme === 'remove' ? CmsUiRemoveButton : CmsUiButton
})
</script>

<style lang="scss" scoped>
.confirm-modal {
  .title {
    margin: 0 0 20px 0;
  }

  .subtitle {
    margin: 0 0 40px 0;
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}
</style>
