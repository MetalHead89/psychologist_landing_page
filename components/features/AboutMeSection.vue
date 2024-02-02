<template>
  <div class="page-section about-me-section">
    <h2 class="about-me__title">
      <span class="accent-text">Добро пожаловать</span> на мой сайт!
    </h2>

    <p>
      Меня зовут Бакалова Екатерина Юрьевна. Я психолог-практик и семейный психолог. Помогаю справиться с жизненными трудностями, улучшить эмоциональное состояние и найти гармонию в жизни. Я верю, что каждый человек обладает внутренним потенциалом для изменений. Моя цель - помочь вам раскрыть этот потенциал и достичь желаемых результатов.
    </p>

    <NuxtImg
      src="/images/photo_v1.jpg"
      sizes="480px"
      format="webp"
      alt="Фотография"
      class="photo"
    />

    <h3>Образование</h3>

    <p>Красноярский государственный педагогический университет им. В.П.Астафьева по направлению «Мастерство психологического консультирования».</p>
    <p>Московский «Институт по повышению квалификации и профессиональной переподготовки специалистов» с присвоением квалификации «Семейный психолог».</p>

    <p class="refresher-courses">
      Курсы повышения квалификации по программам:
    </p>

    <ul class="education-list">
      <li>«Логотерапия в семейном консультировании. Практический подход в работе с утратой смысла жизни».</li>
      <li>«Когнитивно-поведенческая терапия детей и подростков».</li>
      <li>«Психодинамический подход в консультировании».</li>
      <li>«Теория и практика психологического консультирования в сексологии».</li>
    </ul>

    <p>Записаться на консультацию можно по <a href="tel:+79029745983" class="link-global">телефону</a> или через форму ниже.</p>

    <h3 class="social-media-title">
      Социальные сети
    </h3>

    <ul class="social-media-links">
      <li><a href="https://vk.com/ekaterina.bakalova" class="link-global">Профиль в VK</a></li>
      <li><a href="https://vk.com/psycholog.bakalova" class="link-global">Сообщество «Психология на каждый день»</a></li>
    </ul>

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
      <h3>Продолжительность консультации -</h3><span>50 минут.</span>
    </div>

    <p class="address">
      Оказываю психологические услуги онлайн или в формате личной встречи по адресу г.Канск, ул. Горького 41
    </p>

    <h3>Консультации осуществляются только по предварительной записи.</h3>
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

  .education-list,
  .social-media-links {
    list-style-type: none;
  }

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

  .refresher-courses {
    clear: left;

    @media screen and (min-width: 1000px) {
      clear: none;
    }
  }

  .social-media-title {
    clear: left;

    @media screen and (min-width: 1100px) {
      clear: none;
    }
  }

  .schedule {
    clear: left;

    @media screen and (min-width: 1200px) {
      clear: none;
    }
  }

  .price {
    clear: left;

    @media screen and (min-width: 1300px) {
      clear: none;
    }
  }

  .duration {
    display: flex;
    align-items: baseline;
    gap: 5px;
    clear: left;

    @media screen and (min-width: 1400px) {
      clear: none;
    }
  }

  .address {
    clear: left;

    @media screen and (min-width: 1575px) {
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
