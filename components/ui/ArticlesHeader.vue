<template>
  <header class="header">
    <div :class="contentClasses">
      <nav>
        <ul class="navigation">
          <li>
            <NuxtLink
              class="link"
              :to="{ name: 'index' }"
            >
              Главная
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              class="link"
              :to="{ name: 'articles' }"
            >
              Статьи
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
const scrollPosition = ref(0)

const contentClasses = computed(() => {
  return [
    'header-content',
    scrollPosition.value > 0 && 'header-content_is-fixed'
  ]
})

const getScrollPosition = () => {
  scrollPosition.value = window.scrollY
}

if (import.meta.browser) {
  document.addEventListener('scroll', getScrollPosition)
}
</script>

<style lang="scss" setup scoped>
.header {
  width: 100%;
  min-height: 60px;

  .header-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 60px;

    &_is-fixed {
      position: fixed;
      background: #ffffff;
      box-shadow: 0px 8px 40px -17px #00000035;
      z-index: 101;
    }
  }

  .navigation {
    display: flex;
    gap: 10px;
    list-style-type: none;
    padding: 0;
  }

  .link {
    text-decoration: none;
    color: $font-color;

    &.router-link-active {
      color: $primary-color;
      font-weight: 600;
    }
  }
}
</style>
