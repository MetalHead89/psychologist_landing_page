<template>
  <nav :class="classes">
    <div class="list-wrapper">
      <ul class="navigation-list">
        <li
          v-for="({ section, title, isActive: isActivated }, index) in links"
          :key="index"
          :class="getItemClasses(isActivated)"
          @click="handleMenuItemClick(section)"
        >
          {{ title }}
        </li>

        <li :class="BASE_ITEM_CLASS">
          <NuxtLink
            :to="{ name: 'articles' }"
            class="link"
          >
            Cтатьи
          </NuxtLink>
        </li>

        <li :class="BASE_ITEM_CLASS" @click="handleFeedbackClick">
          Оставить отзыв
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useModal } from 'vue-final-modal'
import FeaturesFeedbackModal from '@/components/features/FeedbackModal.vue'

const BASE_CLASS = 'navigation'
const BASE_ITEM_CLASS = 'menu-item'
const { t } = useI18n()

const { open } = useModal({
  component: FeaturesFeedbackModal
})

const links = ref([
  { section: '.hero-section', isActive: false, title: t('ui.navigation.main') },
  { section: '.about-me-section', isActive: false, title: t('ui.navigation.about_me') },
  { section: '.memo-section', isActive: false, title: t('ui.navigation.memo') },
  { section: '.education-section', isActive: false, title: t('ui.navigation.education') },
  { section: '.feedback-section', isActive: false, title: t('ui.navigation.feedback') }
])

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

const activatedNavbarItem: IntersectionObserverCallback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.value = links.value.map(link => {
        return {
          ...link,
          isActive: entry.target.classList.contains(link.section.slice(1))
        }
      })
    }
  })
}

const getItemClasses = (isActive: boolean) => {
  return [
    BASE_ITEM_CLASS,
    isActive && `${BASE_ITEM_CLASS}_is-active`
  ]
}

if (import.meta.browser) {
  const observer = new IntersectionObserver(activatedNavbarItem, { threshold: 0.5 })
  document.querySelectorAll('.page-section')
    .forEach(section => observer.observe(section))
}

const handleFeedbackClick = () => {
  open()
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

  .list-wrapper {
    padding: 100px 10px 30px 10px;
    height: 100%;

    @media screen and (min-width: $md) {
      padding: 0;
    }
  }

  .navigation-list {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;

    @media screen and (min-width: $md) {
      flex-direction: row;
      justify-content: flex-end;
      gap: 20px;
      padding: 0;
      height: auto;
      overflow: initial;
    }

    @media screen and (min-width: $xl) {
      gap: 1vw;
    }
  }

  .menu-item {
    position: relative;
    list-style-type: none;
    text-align: center;
    cursor: pointer;
    font-size: 22px;
    text-decoration: none;

    &_is-active {
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -3px;
        border-bottom: 2px solid currentColor;

        @media screen and (min-width: $xl) {
          border-bottom: 0.3vh solid currentColor;
          bottom: -0.4vh;
        }
      }
    }

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

  .link {
    text-decoration: none;
    color: #ffffff;
  }

  &_is-active {
    left: 0;
  }
}
</style>
