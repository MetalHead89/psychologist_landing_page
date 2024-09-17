<template>
  <button
    type="button"
    class="burger"
    @click="handleBurgerClick"
  >
    <div class="line" />
    <div class="line" />
    <div class="line" />
  </button>
</template>

<script lang="ts" setup>
// import { useSidebarStore } from '@/stores/sidebar'

// const sidebarStore = useSidebarStore()

const handleBurgerClick = () => {
  // sidebarStore.toggleState()
}
</script>

<style lang="scss" scoped>
$line-height: 3px;
$line-width: 23px;

.burger {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  transition-duration: 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;

  .line {
    transition-duration: 0.5s;
    height: $line-height;
    width: $line-width;
    background-color: $cms-text-color;
    border-radius: 5px;
  }

  // &_is-active {
  //   position: fixed;
  //   z-index: 102;
  //   transform: rotate(180deg);

  //   .line {
  //     &:nth-child(1) {
  //       transform: rotateZ(45deg) scaleX(0.78) translate(7px, -3px);
  //     }

  //     &:nth-child(3) {
  //       transform: rotateZ(-45deg) scaleX(0.78) translate(7px, 3px);
  //     }
  //   }
  // }

  &:hover {
    cursor: pointer;
  }
}
</style>