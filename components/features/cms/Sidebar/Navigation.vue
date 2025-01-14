<template>
  <nav class="navigation">
    <CmsUiScrollBar class="scroll-bar">
      <ul class="navigation-list">
        <li
          v-for="({ icon, title, routeName }, index) in navigationItems"
          :key="index"
        >
        <NuxtLink :to="{ name: routeName }" class="navigation-item">
          <i :class="`icon ${icon}`" />

          <ClientOnly>
            <Transition name="fade">
              <div
                v-if="!isLgScreenSize || sidebarStore.isFullShow"
                class="truncated"
              >
              {{ title }}
              </div>
            </Transition>
          </ClientOnly>
        </NuxtLink>
        </li>
      </ul>
    </CmsUiScrollBar>
  </nav>
</template>

<script lang="ts" setup>
const { isLgScreenSize } = useScreen()
const sidebarStore = useSidebarStore()

const navigationItems = [
  { icon: 'ic-message-star-outline', title: 'Отзывы', routeName: 'admin-feedbacks' },
  { icon: 'ic-post-outline', title: 'Статьи', routeName: 'admin-articles' }
]
</script>

<style lang="scss" scoped>
.navigation {
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .scroll-bar {
    height: 100%;
  }

  .navigation-list {
    padding: 10px 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;
  }

  .navigation-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 12px;
    padding: 8px 12px;
    border-radius: $cms-border-radius;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: $cms-text-color;

    &:hover,
    &.router-link-active {
      background: $cms-hover-bg-color;
    }
  }

  .icon {
    font-size: 22px;
  }

  .fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
}
</style>
