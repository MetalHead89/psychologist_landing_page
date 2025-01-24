import getPictureSources from '@/helpers/getPictureSources'
import { DEFAULT_IMAGE_SIZES } from '@/shared/constants'

const PLACEHOLDER_URL = '/images/image_placeholder.svg'

export function useImgToPicture() {
  const imgTagPattern = /<img\s+([^>]+)>/g

  const replaceImgWithPicture = (html: string): string => {
    return html.replace(imgTagPattern, (_, attributes) => {
      const attrs: Record<string, string> = {}
      const styles: Record<string, string> = {}

      attributes.replace(/(\w+)="([^"]*)"/g, (_: unknown, key: string, value: string) => {
        attrs[key] = value
        return ''
      });

      (attrs['style'] || '').replace(/(\w+): ([^;]*)/g, (_: unknown, key: string, value: string) => {
        styles[key] = value
        return ''
      })

      const src = attrs['src'] || ''
      const alt = attrs['alt'] || ''
      const width = attrs['width'] || ''
      const height = attrs['height'] || ''
      const style = (attrs['style'] || '') + `
        width: ${width}px;
        height: ${height}px;
        background: #f2f2f2 url(${PLACEHOLDER_URL}) center center / contain no-repeat;
        aspect-ratio: ${width} / ${height};
      `

      const sources = getPictureSources({
        sizes: DEFAULT_IMAGE_SIZES,
        maxWidth: Number(width) || undefined,
        src
      }).map(({ type, srcset, media }) => `
        <source
          srcset="${srcset}"
          type="${type}"
          media="${media}"
        >
      `).join('')

      return `
      <div
        width="${width}px"
        height="${height}px"
        style="${style}"
        class="picture-wrapper"
      >
        <picture>
          ${sources}
          <img src="${src}" alt="${alt}" loading="lazy">
        </picture>
      </div>`
    })
  }

  return { replaceImgWithPicture }
}
