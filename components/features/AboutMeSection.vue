<!-- eslint-disable max-len -->
<template>
  <div class="page-section about-me-section">
    <h2 class="about-me__title">
      <span class="accent-text">Добро пожаловать</span> на мой сайт!
    </h2>

    <p>
      Меня зовут Бакалова Екатерина Юрьевна и я психолог-консультант. У меня высшее образование, в области психологии и педагогики, которое позволяет мне эффективно работать со взрослыми и подростками.
    </p>

    <NuxtImg
      src="/images/about_me_photo.jpg"
      sizes="480px"
      format="avif"
      alt="Фотография"
      class="photo"
    />

    <p>
      Приглашаю на индивидуальные психологические консультации взрослых и подростков на которых мы вместе сможем:
    </p>

    <ul>
      <li>выработать алгоритм выхода из кризисной ситуации;</li>
      <li>обсудить шаги как жить дальше, после утраты близкого человека;</li>
      <li>учиться способам саморегуляции через техники Арт-терапии;</li>
      <li>
        установить контакт с внутренним ребенком через техники транзактного анализа (если вы нуждаетесь в постоянном одобрении окружающих);
      </li>
      <li>выразить экологичным способом злость и агрессию путем применения техник Гештальт-терапии;</li>
      <li>определить скрытый потенциал и ресурсы через Метафорические ассоциативные карты.</li>
    </ul>

    <h3>Вот мои достижения в области психологии:</h3>

    <ul>
      <li><p>В 2020 году прошла курсы повышения квалификации по программам «Психодинамический подход в консультировании» (108 ч.); «Теория и практика психологического консультирования в сексологии» (144 ч.)</p></li>
      <li><p>В 2021 окончила Московский «Институт по повышению квалификации и профессиональной переподготовки специалистов» с присвоением квалификации «Семейный психолог» (640 ч.)</p></li>
      <li><p>С 2022 года обучаюсь в магистратуре Красноярского государственного педагогического университета им.В.П.Астафьева по направлению «Мастерство психологического консультирования».</p></li>
    </ul>

    <p>
      Если вы чувствуете, что вам нужна помощь психолога, я приглашаю вас на консультацию.
    </p>

    <p class="clear">
      Оказываю психологические услуги онлайн или в формате личной встречи по адресу г.Канск, ул. Цимлянская, д.3
    </p>

    <div class="schedule">
      <h3>Часы работы (формат личной встречи):</h3>

      <ul>
        <li>понедельник-пятница с 18:00 до 21:00</li>
        <li>суббота с 14:00 до 18:00</li>
        <li>воскресенье с 12:00 до 18:00</li>
      </ul>
    </div>

    <div class="price">
      <h3>Cтоимость консультации:</h3>

      <ul>
        <li>Первая - 1200 рублей</li>
        <li>Последующие - 1700 рублей</li>
      </ul>
    </div>

    <div class="duration">
      <h3>Продолжительность консультации:</h3>

      <p>
        50 минут.
      </p>
    </div>
    <div class="clear-fix" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.about-me-section {
  padding: 8vh $content-padding;
  position: relative;
  scroll-margin-top: 79px;

  .photo {
    width: 100%;
    max-width: $sm;
    margin: 18px auto;
    display: block;
    border-radius: $base-border-radius;

    @media screen and (min-width: $md) {
      width: 43%;
      float: left;
      margin-right: 50px;
    }

    @media screen and (min-width: $xl) {
      margin-right: 2.6vw;
    }
  }
  .schedule {
    clear: left;

    @media screen and (min-width: 1640px) {
      clear: none;
    }
  }

  .price {
    clear: left;

    @media screen and (min-width: 1840px) {
      clear: none;
    }
  }

  .duration {
    clear: left;

    @media screen and (min-width: 2665px) {
      clear: none;
    }
  }

  .clear-fix {
    clear: both;
  }

  .about-me__section-title {
    margin-bottom: 1vh;
  }

  .about-me__title {
    margin-top: 30px;

    @media screen and (min-width: $md) {
      margin-top: 0;
    }
  }
}
</style>
