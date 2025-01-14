<template>
  <div
    ref="cropperWrapper"
    :class="wrapperClasses"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <i class="ic-image" />

    <div class="caption">
      <div class="caption__title">Перетащите изображение сюда</div>
      <div class="caption__additional-text">
        или нажмите на кнопку
      </div>
    </div>

    <CmsUiButton
      class="upload-image-button"
      @click="handleUploadImageClick"
    >
      Загрузить изображение
    </CmsUiButton>

    <Cropper
      v-if="originalImage"
      class="cropper"
      :src="originalImage"
      :stencil-props="{
        aspectRatio: 16 / 9
      }"
      :default-size="getDefaultCropperSize"
      @change="handleCropperChange"
    />

    <UiCloseButton
      v-if="originalImage"
      class="close-button"
      @click="handleCloseClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

import { useFileUtils } from '@/composables/file_utils'

interface Props {
  width?: string
  height?: string,
  uploadAccept?: string,
  initImage?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  width: '400px',
  height: '225px',
  uploadAccept: 'image/jpg, image/jpeg, image/svg+xml',
  initImage: null
})

const emit = defineEmits(['update:model-value'])

const cropperWrapper = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const originalImage = ref<string | null>(null)
const hasNewInitImage = ref(false)

const { fileToBase64 } = useFileUtils()

const wrapperClasses = computed(() => {
  return [
    'cropper-wrapper',
    isDragging.value && 'cropper-wrapper_is-dragging'
  ]
})

watch(
  () => props.initImage,
  image => {
    if (image) {
      hasNewInitImage.value = true
      originalImage.value = image
    }
  }
)

onMounted(() => {
  if (cropperWrapper.value) {
    cropperWrapper.value.style.width = props.width
    cropperWrapper.value.style.height = props.height
  }
})

const handleUploadImageClick = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', props.uploadAccept)
  input.addEventListener('change', onUpload)
  input.click()
}

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  onUpload(event)
}

const onUpload = async (event: Event | DragEvent) => {
  let file: File | null = null

  if (event instanceof DragEvent) {
    const files = event.dataTransfer?.files
    file = files ? files[0] : null
  } else {
    const target = event.target as HTMLInputElement
    file = (target.files) ? target.files[0] : null
  }

  if (!file || !props.uploadAccept.split(', ').includes(file.type)) {
    return
  }

  try {
    originalImage.value = await fileToBase64(file)
  } catch (error) {
    console.error(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCropperChange = ({ canvas }: any) => {
  if (hasNewInitImage.value) {
    hasNewInitImage.value = false
    return
  }

  emit('update:model-value', canvas.toDataURL())
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDefaultCropperSize = ({ imageSize, visibleArea }: any) => {
  return {
    width: (visibleArea || imageSize).width,
    height: (visibleArea || imageSize).height
  }
}

const handleCloseClick = () => {
  originalImage.value = null
  emit('update:model-value', null)
}
</script>

<style lang="scss" scoped>
.cropper-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: $cms-border-radius;
  background: $primary-background;
  box-sizing: border-box;
  gap: 20px;

  .ic-image {
    color: $primary-color;
    font-size: 40px;
  }

  .caption {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__title {
      font-weight: 700;
    }

    &__additional-text {
      font-size: 14px;
    }
  }

  .cropper {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .close-button {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(10px, -10px);
    background: $primary-color;
    border-radius: 50%;
    outline: 2px solid #ffffff;
    padding: 5px;

    :deep(.ic-close) {
      color: #ffffff;
      font-size: 20px;
    }
  }

  &_is-dragging {
    animation: flicker 0.6s ease-in infinite alternate;
  }
}

@keyframes flicker {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.5;
  }
}
</style>
