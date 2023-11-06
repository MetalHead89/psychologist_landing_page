<template>
  <nav :class="classes">
    <ul class="top-menu">
      <li
        v-for="({ section, title }, index) in links"
        :key="index"
        class="menu-item"
        @click="handleMenuItemClick(section)"
      >
        {{ title }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const BASE_CLASS = 'navigation'
const { t } = useI18n()

const links = [
  { section: '.hero-section', title: t('ui.navigation.main') },
  { section: '.about-me-section', title: t('ui.navigation.about_me') },
  { section: '.consultation-section', title: t('ui.navigation.consulting') },
  { section: '.skills-section', title: t('ui.navigation.techniques') },
  { section: '.education-section', title: t('ui.navigation.education') },
  { section: '.feedback-section', title: t('ui.navigation.feedback') }
]

export interface Props {
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits(['click'])

const classes = computed(() => {
  return [
    BASE_CLASS,
    props.isActive && `${BASE_CLASS}_is-active`
  ]
})

const handleMenuItemClick = (section: string) => {
  const anchor = document.querySelector(section)
  anchor?.scrollIntoView()
  emit('click')
}
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  left: -100%;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: $primary-color;
  transition: left 0.4s ease;

  @media screen and (min-width: $md) {
    position: static;
    background: transparent;
  }

  .top-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding: 100px 10px;
    height: 100%;
    box-sizing: border-box;

    @media screen and (min-width: $md) {
      flex-direction: row;
      justify-content: flex-end;
      gap: 20px;
      padding: 0;
      height: auto;
    }

    @media screen and (min-width: $xl) {
      gap: 1vw;
    }
  }

  .menu-item {
    list-style-type: none;
    text-align: center;
    cursor: pointer;
    font-size: 22px;

    @media screen and (min-width: $md) {
      font-size: 12px;
    }

    @media screen and (min-width: $lg) {
      font-size: 16px;
    }

    @media screen and (min-width: $xl) {
      font-size: 0.84vw;
    }
  }

  &_is-active {
    left: 0;
  }
}
</style>
