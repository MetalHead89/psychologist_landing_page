<template>
  <div
    :class="classes"
    :style="{ background: `url(${placeholder}) center center / cover no-repeat` }"
  >
    <div v-if="isLoading" class="load-overlay" />
    <picture>
      <template v-for="(media, index) in sources" :key="index">
        <source
          v-for="(type, typeIndex) in media.types"
          :key="typeIndex"
          :srcset="type.srcset"
          :media="media.media"
          :type="type.type"
        />
      </template>
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
import { BREAKPOINTS } from '@/shared/constants'

type TBreakpointKey = keyof typeof BREAKPOINTS;

// const SCREEN_SIZES: TBreakpointKey[] = Object.keys(BREAKPOINTS) as TBreakpointKey[]
const DEFAULT_SIZES = '320 xs:480 sm:768 md:1024 lg:1920'

type SizeEntry = {
  width: number;
  breakpoint: number;
}

type SourceType = {
  type: string;
  srcset: string;
}

type MediaSource = {
  media: string | undefined;
  types: SourceType[];
}

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
  sizes: DEFAULT_SIZES,
  placeholder: '/images/image_placeholder_16x9.svg'
})

onMounted(() => {
  if (imageRef.value?.complete && imageRef.value.naturalWidth) {
    handlePictureLoad()
  } else if (imageRef.value?.complete && !imageRef.value.naturalWidth) {
    handlePictureError()
  }
})

const sources = computed<MediaSource[]>(() => {
  const sizeEntries: SizeEntry[] = []
  let defaultSize: null | number = null
  const sizes = (props.sizes || DEFAULT_SIZES).split(' ')

  if (sizes.length === 1) {
    const [breakpointSize, imageWidth] = sizes[0].split(':')
    const width = imageWidth ? parseInt(imageWidth, 10) : breakpointSize
    const baseSrc = `${props.src.split('.')[0]}`

    return [
      {
        types: [
          {
            type: 'image/avif',
            srcset: `${baseSrc}.avif?width=${width}px, ${baseSrc}.avif?width=${width}px&density=2x 2x`
          },
          {
            type: 'image/webp',
            srcset: `${baseSrc}.webp?width=${width}px, ${baseSrc}.webp?width=${width}px&density=2x 2x`
          }
        ]
      }
    ] as MediaSource[]
  }

  sizes.forEach(size => {
    if (size.includes(':')) {
      const [breakpointSize, imageWidth] = size.split(':')
      const breakpointValue = BREAKPOINTS[breakpointSize as TBreakpointKey]

      sizeEntries.push({
        width: parseInt(imageWidth, 10),
        breakpoint: breakpointValue
      })
    } else {
      defaultSize = Number(size)
    }
  })

  sizeEntries.push({
    width: 0,
    breakpoint: sizeEntries[sizeEntries.length - 1].breakpoint + 1
  })

  let currentSize = defaultSize || sizeEntries[0].width

  return sizeEntries.map(({ width, breakpoint }, index) => {
    const media = index === sizeEntries.length - 1
      ? `(min-width: ${breakpoint}px)`
      : `(max-width: ${breakpoint}px)`

    const baseSrc = `${props.src.split('.')[0]}`

    const types: SourceType[] = [
      {
        type: 'image/avif',
        srcset: `${baseSrc}.avif?width=${currentSize}px, ${baseSrc}.avif?width=${currentSize}px&density=2x 2x`
      },
      {
        type: 'image/webp',
        srcset: `${baseSrc}.webp?width=${currentSize}px, ${baseSrc}.webp?width=${currentSize}px&density=2x 2x`
      }
    ]

    currentSize = width

    return { media, types }
  })
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
