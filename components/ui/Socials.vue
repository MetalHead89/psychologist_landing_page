<template>
  <ul class="socials">
    <li
      v-for="({ image, link }, index) in items"
      :key="index"
      class="social-item">
      <a v-bind="link" class="link">
        <img v-bind="image" class="image" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const items = [
  {
    link: {
      href: 'https://vk.com/ekaterina.bakalova',
      target: '_blank'
    },
    image: {
      src: '/images/vk.svg',
      title: 'Профиль в VK'
    }
  },
  {
    link: {
      href: 'https://www.b17.ru/bakalova_ekaterina/?prt=1014279',
      target: '_blank'
    },
    image: {
      src: '/images/b17.png',
      title: 'Профиль на b17'
    }
  },
  {
    link: {
      href: 'https://www.avito.ru/kansk/predlozheniya_uslug/psiholog_onlayn_ili_v_kabinete_3687216839?context=H4sIAAAAAAAA_wEfAOD_YToxOntzOjEzOiJsb2NhbFByaW9yaXR5IjtiOjA7fQseF2QfAAAA',
      target: '_blank'
    },
    image: {
      src: '/images/avito.svg',
      title: 'Страница услуги в avito'
    }
  },
  {
    link: {
      href: 'https://t.me/bakalova_ekaterina',
      target: '_blank'
    },
    image: {
      src: '/images/telegram.svg',
      title: 'Я в telegram'
    }
  }
]
</script>

<style lang="scss" scoped>
.socials {
  list-style-type: none;
  display: flex;
  align-items: top;
  flex-wrap: wrap;
  gap: 10px;

  .link {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.3s ease;
    background: #ffffff;

    &:hover {
      transform: rotate(5deg);
    }
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
