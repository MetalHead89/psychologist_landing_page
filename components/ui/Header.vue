<template>
  <header :class="classes">
    <UiNavigation
      :is-active="isActiveBurger"
      @click="handleNavigationClick"
    />

    <UiBurger
      :is-active="isActiveBurger"
      @click="handleBurgerClick"
    />
  </header>
</template>

<script lang="ts" setup>
const BASE_CLASS = 'header'
const scrollPosition = ref(0)
const isActiveBurger = ref(false)

const classes = computed(() => {
  return [
    BASE_CLASS,
    scrollPosition.value > 0 && `${BASE_CLASS}_is-fixed`
  ]
})

const getScrollPosition = () => {
  scrollPosition.value = window.scrollY
}

const handleNavigationClick = () => {
  isActiveBurger.value = false
}

const handleBurgerClick = () => {
  isActiveBurger.value = !isActiveBurger.value
}

if (process.browser) {
  document.addEventListener('scroll', getScrollPosition)
}
</script>

<style lang="scss" setup>
.header {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  padding: 30px;
  min-height: 79px;
  transition: box-shadow 0.4s ease;

  @media screen and (min-width: $xl) {
    padding: 1.5vw;
  }

  &_is-fixed {
    position: fixed;
    background: $primary-color;
    box-shadow: 0px 8px 40px -17px #00000035;
    z-index: 101;
  }

  .burger {
    @media screen and (min-width: $md) {
      display: none;
    }
  }
}
</style>
