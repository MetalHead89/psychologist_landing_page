<!-- eslint-disable max-len -->
<template>
  <div class="about-me-section">
    <div class="background" />

    <h2 class="about-me__title">
      <span class="accent-text">Добро пожаловать</span> на мой сайт!
    </h2>

    <p>
      Меня зовут Бакалова Екатерина Юрьевна и я практикующий психолог. У меня высшее психолого-педагогическое образование, которое позволяет мне эффективно работать с младшими школьниками, подростками и взрослыми.
    </p>

    <p>
      Раньше я работала учителем начальных классов, но сейчас преподаю в педагогическом колледже, а с 2020 года я начала карьеру в области психологии.
    </p>

    <h3>Вот мои достижения в области психологии:</h3>

    <ul>
      <li><p>В 2020 году прошла курсы повышения квалификации по программам «Психодинамический подход в консультировании» (108 ч.); «Теория и практика психологического консультирования в сексологии» (144 ч.)</p></li>
      <li><p>В 2021 окончила Московский «Институт по повышению квалификации и профессиональной переподготовки специалистов» с присвоением квалификации «Семейный психолог» (640 ч.)</p></li>
      <li><p>С 2022 года обучаюсь в магистратуре Красноярского государственного педагогического университета им.В.П.Астафьева по направлению «Мастерство психологического консультирования».</p></li>
    </ul>

    <p>
      Если вы чувствуете, что вам нужна помощь психолога, я приглашаю вас на консультацию
    </p>

    <p>
      Оказываю психологические услуги онлайн или в формате личной встречи по адресу г.Канск, ул. Цимлянская, д.3
    </p>

    <h3>Часы работы (формат личной встречи):</h3>
    <ul>
      <li>суббота 14:00-18:00</li>
      <li>воскресенье с 12:00-18:00</li>
    </ul>

    <!-- <h2 class="about-me__title">
      {{ $t('about_me.title') }}
    </h2>

    <div class="about-me__text">
      <p class="about-me__text-section">
        {{ $t('about_me.name') }}
      </p>

      <i18n-t
        keypath="about_me.education"
        tag="p"
        class="about-me__text-section"
      >
        <template #accent>
          <b class="accent-text">{{ $t('about_me.education_accent') }}</b>
        </template>
      </i18n-t>

      <h3 class="about-me__text-section about-me__section-title accent-text">
        {{ $t('about_me.tasks_title') }}
      </h3>

      <ul class="list">
        <li
          v-for="(item, index) in $tm('about_me.tasks')"
          :key="index"
          class="about-me__task-item"
        >
          {{ item }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { $gsap } = useNuxtApp()
let timeline: gsap.core.Timeline | null = null

onMounted(() => {
  loadAnimation()
})

const loadAnimation = () => {
  timeline = $gsap.timeline()

  timeline
    .from('.about-me__text-section', {
      x: '-5vw',
      opacity: 0,
      stagger: 0.3
    })
    .from('.about-me__task-item', {
      x: '-5vw',
      opacity: 0,
      stagger: 0.3
    })

  ScrollTrigger.create({
    trigger: '.about-me-section',
    start: 'top 30%',
    toggleActions: 'play none none none',
    animation: timeline
  })
}
</script>

<style lang="scss" scoped>
.about-me-section {
  padding: 10vh $content-padding;
  position: relative;

  .background {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - $content-padding);
    height: calc(100% - 10vh);
    background: $primary-background;
    border-radius: 30px;
    z-index: -1;
    opacity: 0.9;

    @media screen and (min-width: $md) {
      opacity: 0.5;
    }
  }

  .about-me__section-title {
    margin-bottom: 1vh;
  }

  .list {
    margin: 0;
  }

  .about-me__title {
      margin-top: 30px;

      @media screen and (min-width: $md) {
        margin-top: 0;
      }
    }

  @media screen and (min-width: $md) {
    .content {
      flex-direction: row;
      align-items: flex-start;
      gap: 5vw;
    }

    .about-me__picture {
      width: 30vw;
    }
  }
}
</style>
