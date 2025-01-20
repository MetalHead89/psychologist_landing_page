<template>
  <div class="article-card">
    <NuxtLink :to="{ name: 'articles-slug', params: { slug } }" class="link-wrapper">
      <div class="image-wrapper">

        <UiImage
          :src="previewImageUrl"
          sizes="298 xs:457 sm:352 md:313"
          class="image"
        />
      </div>

      <div class="info">
        <div class="created-date">
          {{ DateTime.fromISO(createdAt).setLocale('ru').toLocaleString(DateTime.DATE_MED) }}
        </div>

        <h3 class="title">
          {{ name }}
        </h3>

        <div class="preview-text">
          {{ previewText }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'

interface IProps {
  name: string,
  slug: string,
  previewText: string,
  createdAt: string,
  previewImageUrl: string
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.article-card {
  cursor: pointer;
  border-radius: $base-border-radius;
  border: 1px solid #ededed;
  overflow: hidden;

  .image-wrapper {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .image {
    aspect-ratio: 16 / 9;
    width: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
  }

  .created-date {
    margin: 0 0 10px 0;
    color: $font-color-light;
    font-size: 14px;
  }

  .title {
    color: $font-color;
    margin: 0 0 20px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .info {
    padding: 30px;
  }

  .preview-text {
    font-size: 15px;
    color: $font-color-light;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }

  .link-wrapper {
    text-decoration: none;
  }

  &:hover {
    .image {
      transform: scale(1.06) rotate(2deg);
    }
  }
}
</style>
