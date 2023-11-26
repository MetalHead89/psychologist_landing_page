<template>
  <div
    :class="classes"
    @click="$emit('click')"
  >
    <div class="line line-1" />
    <div class="line line-2" />
    <div class="line line-3" />
  </div>
</template>

<script lang="ts" setup>
const BASE_CLASS = 'burger'
const scrollPosition = ref(0)

export interface Props {
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

defineEmits(['click'])

const classes = computed(() => {
  return [
    BASE_CLASS,
    props.isActive && `${BASE_CLASS}_is-active`
  ]
})

const getScrollPosition = () => {
  scrollPosition.value = window.scrollY
}

if (process.browser) {
  document.addEventListener('scroll', getScrollPosition)
}
</script>

<style lang="scss" scoped>
.burger {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 103;

  .line {
    background: white;
    width: 25px;
    height: 3px;
    transition: all 0.3s ease;
  }

  &_is-active {
    .line-1 {
      transform: rotate(-45deg) translate(-5px, 6px);
    }

    .line-2 {
      opacity: 0;
    }

    .line-3 {
      transform: rotate(45deg) translate(-5px, -6px);
    }
  }
}
</style>
