<template>
  <div ref="formFooter" class="form-footer">
    <div :class="footerWrapperClasses">
      <footer ref="footer" class="footer">
        <slot name="left-section">
          <div class="footer-section">
            <CmsUiRemoveButton
              v-if="$props.remove"
              :type="$props.cancel?.type || 'button'"
              :is-loading="$props.isLoading"
              v-bind="$props.remove"
              @click="handleButtonClick('remove')"
            >
              {{  $props.remove.text || 'Удалить' }}
            </CmsUiRemoveButton>
          </div>
        </slot>

        <CmsUiPagination
          v-if="isShowPagination"
          :current-page="pagination.value.page"
          :total-pages="pagination.value.totalPages"
          :items-per-page="pagination.value.perPage"
          :total-items="pagination.value.totalItems"
          @page-change="$emit('page-change', $event)"
        />

        <slot name="right-section">
          <div class="footer-section">
            <CmsUiBorderedButton
              v-if="$props.cancel"
              :type="$props.cancel?.type || 'button'"
              :is-loading="$props.isLoading"
              v-bind="$props.cancel"
              @click="handleButtonClick('cancel')"
            >
              {{  $props.cancel.text || 'Отменить' }}
            </CmsUiBorderedButton>

            <CmsUiButton
              v-if="$props.submit"
              :type="$props.submit?.type || 'submit'"
              :is-loading="$props.isLoading"
              v-bind="$props.submit"
              @click="handleButtonClick('submit')"
            >
              {{  $props.submit.text || 'Сохранить' }}
            </CmsUiButton>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
export type TFooterButton = {
  type?: 'button' | 'submit' | 'reset',
  isLoading?: boolean,
  text?: string,
  disabled?: boolean,
  clickHandler: (data?: unknown) => unknown
}

export interface Props {
  submit?: TFooterButton,
  cancel?: TFooterButton,
  remove?: TFooterButton,
  isLoading?: boolean,
  pagination?: Ref<TPaginationData>
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  submit: undefined,
  cancel: undefined,
  remove: undefined,
  pagination: undefined
})

defineEmits(['page-change'])

const sidebarStore = useSidebarStore()

const formFooter = ref<HTMLElement | null>(null)
const footer = ref<HTMLElement | null>(null)

const isShowPagination = computed(() => {
  const totalPages = props.pagination?.value?.totalPages
  return totalPages && (totalPages > 1)
})

const footerWrapperClasses = computed(() => {
  return [
    'footer-wrapper',
    !sidebarStore.isFullShow && 'footer-wrapper_is-full'
  ]
})

const handleFooterResize = () => {
  if (!footer.value || !formFooter.value) {
    return
  }

  formFooter.value.style.height = footer.value.offsetHeight + 'px'
}

let footerResizeObserver: ResizeObserver | null = null

if (import.meta.browser) {
  footerResizeObserver = new ResizeObserver(handleFooterResize)
}

onMounted(() => {
  if (footer.value && footerResizeObserver) {
    footerResizeObserver.observe(footer.value)
  }
})

const handleButtonClick = (type: 'submit' | 'cancel' | 'remove') => {
  if (props[type]?.clickHandler) {
    props[type].clickHandler()
  }
}
</script>

<style lang="scss">
.form-footer {
  height: 60px;

  .footer-wrapper {
    background: linear-gradient(180deg, rgba(248, 247, 250, 0) 44%, rgba(248, 247, 250, 0.43) 73%, rgba(248, 247, 250, 0.7));
    backdrop-filter: saturate(200%) blur(10px);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 $cms-horizontal-padding 20px $cms-horizontal-padding;
    transition: left 0.3s ease;
    z-index: 100;

    @media screen and (min-width: $lg) {
      left: $cms-sidebar-max-width;
    }

    &_is-full {
      left: 0;

      @media screen and (min-width: $lg) {
        left: $cms-sidebar-min-width;
      }
    }

    .footer {
      border-radius: $cms-border-radius;
      box-shadow: $cms-base-shadow;
      background: #ffffff;
      padding: 10px $cms-horizontal-padding;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
}
</style>
