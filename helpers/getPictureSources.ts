import { BREAKPOINTS } from '@/shared/constants'

type TBreakpointKey = keyof typeof BREAKPOINTS;

type SizeBreakpoint = {
  width: string;
  breakpoint: number;
}

type MediaSource = {
  media: string | undefined;
  type: string;
  srcset: string;
}

interface IGetPictureSources {
  (attrs: { sizes: string, maxWidth?: number, src: string }): MediaSource[]
}

interface IGenerateSources {
  (attrs: {
    src: string,
    width: number,
    maxWidth?: number,
    media?: string
  }): MediaSource[]
}

const IMAGE_TYPES = ['image/avif', 'image/webp']

const getPictureSources: IGetPictureSources = ({ sizes, maxWidth, src }) => {
  const sizesAtBreakpoints: SizeBreakpoint[] = []
  const baseSrc = `${src.split('.')[0]}`
  let defaultSize: null | string = null
  const sizePairs = sizes.split(' ')

  if (sizePairs.length === 1) {
    const [breakpointSize, imageWidth] = sizes[0].split(':')
    const width = imageWidth || breakpointSize

    return generateSources({ src: baseSrc, width:  Number(width), maxWidth })
  }

  sizePairs.forEach(size => {
    if (size.includes(':')) {
      const [breakpointSize, imageWidth] = size.split(':')
      const breakpointValue = BREAKPOINTS[breakpointSize as TBreakpointKey]

      sizesAtBreakpoints.push({
        width: imageWidth,
        breakpoint: breakpointValue
      })
    } else {
      defaultSize = size
    }
  })

  sizesAtBreakpoints.push({
    width: '0',
    breakpoint: sizesAtBreakpoints[sizesAtBreakpoints.length - 1].breakpoint + 1
  })

  let currentSize = defaultSize || sizesAtBreakpoints[0].width.toString()

  return sizesAtBreakpoints.reduce((acc, { width, breakpoint }, index) => {
    const media = index === sizesAtBreakpoints.length - 1
      ? `(min-width: ${breakpoint}px)`
      : `(max-width: ${breakpoint}px)`

    const props = generateSources({ src: baseSrc, width: Number(currentSize), media, maxWidth })

    currentSize = width

    return [...acc, ...props]
  }, [] as MediaSource[])
}

const generateSources: IGenerateSources = ({ src, width, media, maxWidth }) => {
  const imageWidth = maxWidth ? Math.min(maxWidth, width) : width

  return IMAGE_TYPES.map(type => ({
    type,
    srcset: `${src}.avif?width=${imageWidth}px, ${src}.avif?width=${imageWidth}px&density=2x 2x`,
    media
  }))
}

export default getPictureSources
