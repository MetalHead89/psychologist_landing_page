<template>
  <div
    :class="classes"
    :style="{ background: `url(${placeholder}) center center / cover no-repeat` }"
  >
    <div v-if="isLoading" class="load-overlay" />
    <picture>
      <source
          v-for="({ type, media, srcset }, index) in sources"
          :key="index"
          :srcset="srcset"
          :media="media"
          :type="type"
        />
      <img
        ref="imageRef"
        :src="src"
        v-bind="$attrs"
        loading="lazy"
        class="image"
        @load="handlePictureLoad"
        @error="handlePictureError"
      />
    </picture>
  </div>
</template>

<script setup lang="ts">
import getPictureSources from '@/helpers/getPictureSources'
import { DEFAULT_IMAGE_SIZES } from '@/shared/constants'

interface IProps {
  sizes?: string,
  src: string,
  placeholder?: string
}

const isLoading = ref(true)
const imageRef = ref<HTMLImageElement | null>(null)
const isLoaded = ref(false)
const classes = computed(() => {
  return [
    'image',
    isLoaded.value && 'image_is-loaded'
  ]
})

const props = withDefaults(defineProps<IProps>(), {
  sizes: DEFAULT_IMAGE_SIZES,
  placeholder: '/images/image_placeholder_16x9.svg'
})

onMounted(() => {
  if (imageRef.value?.complete && imageRef.value.naturalWidth) {
    handlePictureLoad()
  } else if (imageRef.value?.complete && !imageRef.value.naturalWidth) {
    handlePictureError()
  }
})

const sources = computed(() => {
  return getPictureSources({ sizes: props.sizes, src: props.src })
})

const handlePictureLoad = () => {
  isLoading.value = false
  isLoaded.value = true
}

const handlePictureError = () => {
  isLoading.value = false
}
</script>

<style lang="scss" scoped>
.image {
  position: relative;

  .load-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: pulse 1.5s infinite;
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
  }

  &_is-loaded {
    img {
      opacity: 1;
    }
  }

  @keyframes pulse {
    from {
      background: #ffffff00;
    }

    50% {
      background: rgba(255, 255, 255, 0.4);
    }

    to {
      background: #ffffff00;
    }
  }
}
</style>
