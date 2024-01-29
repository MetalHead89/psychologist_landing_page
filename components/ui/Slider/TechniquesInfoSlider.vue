<template>
  <UiBaseSlider
    :slides="slides"
    class="techniques-slider"
  >
    <template #slide="{ title, moreDetailsName }: TSlide">
      <div class="swiper-slide">
        <!-- <img
          :src="imageUrl"
          alt=""
          class="slide-image"
        > -->

        <div class="content">
          <div class="title">
            {{ title }}
          </div>

          <div class="button-wrapper">
            <UiButton @click="handleMoreDetailsClick(moreDetailsName)">
              Подробнее
            </UiButton>
          </div>
        </div>
      </div>
    </template>
  </UiBaseSlider>
</template>

<script setup lang="ts">
import UiBaseSlider from './BaseSlider.vue'

type TSlide = { imageUrl: string, title: string, moreDetailsName: string }

const router = useRouter()

const slides = [
  {
    // imageUrl: useAssetImage('/images/jpg/wallpaper.jpg') as string,
    title: 'Проработка межличностного конфликта: мой опыт и техники',
    moreDetailsName: 'blog-kak_zavershit_mezhlichnostnyj_konflikt'
  },
  {
    // imageUrl: useAssetImage('/images/jpg/wallpaper.jpg') as string,
    title: 'Работа над самооценкой. Из частной практики',
    moreDetailsName: 'blog-rabota_nad_samoocenkoj'
  }
]

const handleMoreDetailsClick = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<style lang="scss" scoped>
.techniques-slider {
  width: 100%;
  height: 500px;
  background: url('/assets/images/noise_diagonal.webp') repeat, $primary-color;
  background-blend-mode: color-burn;

  @media screen and (min-width: $md) {
    height: 600px;
  }

  .swiper-slide {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: $md) {
      justify-content: flex-start;
    }
  }

  .slide-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .title {
    font-size: 1.7rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
      font-size: 2.5rem;
    }
  }

  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    user-select: none;
    // background: #00000086;
    border: 1px solid #ffffff;
    padding: 30px;
    border-radius: 25px;
    margin: 0 30px;

    @media screen and (min-width: $md) {
      margin: 0 $content-padding;
      align-items: flex-start;
      padding: 60px;
    }

    @media screen and (min-width: $lg) {
      max-width: 800px;
    }
  }

  .button-wrapper {
    display: flex;
    box-sizing: border-box;

    @media screen and (min-width: $md) {
      justify-content: flex-start;
    }
  }
}
</style>
