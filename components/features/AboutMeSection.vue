<template>
  <div class="page-section about-me-section">
    <!-- <h2 class="about-me__title">
      <span class="accent-text">Добро пожаловать</span> на мой сайт!
    </h2> -->

    <NuxtImg
      src="/images/photo_v2.jpg"
      sizes="480px"
      format="webp"
      alt="Фотография"
      class="photo"
    />

    <p>Приветствую вас на моем сайте.</p>

    <p>
      Я психолог-консультант для взрослых людей.
    </p>
    <p>
      Консультирую в рамках метода когнитивно-поведенческой терапии (КПТ).  КПТ – это научный метод психотерапии, основанный на взаимосвязи наших мыслей, чувств и поведения. Этот метод привлек меня своей практичностью и ориентированностью на результат. КПТ фокусируется на текущих мыслях, чувствах и поведении человека, а не на его прошлом или бессознательных мотивах. Иными словами, то, как мы думаем о себе, мире и других людях, влияет на то, как мы чувствуем себя и как поступаем.
    </p>

    <p>
      Я обучаюсь данному методу в Институте Психотерапии и медицинской психологии РПА им. Б.Д.Карвасарского, г.Санкт-Петербург.
    </p>

    <p>
      Тем не менее, я не являюсь медицинским специалистом и поэтому не работаю с запросами:
    </p>

    <ul>
      <li>клиническая депрессия;</li>
      <li>суицидальное поведение;</li>
      <li>посттравматическое стрессовое расстройство;</li>
      <li>социофобия;</li>
      <li>др. клинические расстройства личности.</li>
    </ul>

    <p>
      Еще одна особенность - это совместная работа. Психолог и клиент работают вместе как команда, чтобы определить цели, разработать план действий и отслеживать прогресс.
    </p>

    <p>
      Чем может помочь работа в таком подходе? Например: повышение самооценки и уверенности в себе; тревога и стресс; проблемы в отношениях; проблемы с гневом и др.
    </p>

    <p>
      Я приглашаю всех, кто хочет улучшить качество своей жизни, на консультацию. Вместе мы можем найти решения, которые помогут вам справиться с трудностями и достичь поставленных целей.
    </p>

    <p>
      Адрес г. Канск, ул.Горького 41
    </p>

    <p>
      Консультации online проходят на любой платформе по желанию клиента.
    </p>

    <p>
      Предварительная запись по телефону <a href="tel:+79029745983" class="link-global">+7 (902) 974 59-83</a> или через <a href="#feedback-section" class="link-global">форму</a> ниже.
    </p>

    <h2 class="rules-title clear-fix">
      Как будет проходить сессия?
    </h2>

    <p>
      Немного о правилах…
    </p>

    <p>
      Правило 1. Конфиденциальность гарантирована.
    </p>

    <p>
      Правило 2. «Пятьдесят на пятьдесят». Мы совместными усилиями решаем ваш запрос. Эффекта нет, если клиент озвучил проблему и ждет, пока ее решит специалист.
    </p>

    <p>
      Правило 3. Запись на консультацию по предварительной оплате (600 руб.)
    </p>

    <p>
      Правило 4. Предварительная оплата возвращается при возникновении обстоятельств непреодолимой силы за 24 часа до консультации.
    </p>

    <p>
      Сессия длится от 50 минут – online или 80 минут в кабинете.
    </p>

    <p>
      Одна консультация проходит в несколько этапов:
    </p>

    <p>
      <b>1 этап. Знакомство.</b> Беседуем о вашей проблеме и ее диагностируем ее с помощью психологических техник и методов.  Далее проясняем ваш запрос. Здесь нам с вами важно определить, что именно вы хотите получить и к каким изменениям стремитесь?
    </p>

    <p>
      <b>2 этап. Планирование и коррекция.</b> Обсуждаем шаги по поиску решения. Рассматриваем разные варианты. И здесь тоже работаем с техниками, чтобы обойти защиты психики, например: «Да нет, у меня и так все хорошо», «Да это отличный вариант, но…..», «Этого со мной просто не может случиться» и т.д.
    </p>

    <p>
      <b>3 этап. Завершение сессии.</b> Мы подводим итоги нашей работы, кратко повторяем основные моменты, к которым пришли. Обсуждаем, какие изменения вы уже чувствуете и какие шаги вы готовы предпринять для достижения желаемого результата. Я даю клиенту рекомендации по дальнейшим действиям, которые он может выполнять самостоятельно.
    </p>

    <h3 class="social-media-title">
      Я в социальных сетях
    </h3>

    <div class="social-media-links">
      <p><a href="https://vk.com/ekaterina.bakalova" class="link-global">Профиль в VK</a></p>
      <p>
        Присоединяйтесь к замечательному сообществу и откройте для себя мир психологии!
      </p>
      <p>
        Здесь вы найдете ответы на самые важные вопросы о себе и других.
      </p>
      <p><a href="https://vk.com/psycholog.bakalova" class="link-global">Сообщество «Психология на каждый день»</a></p>
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

  .rules-title {
    margin: 40px 0 20px 0;
  }

  .consult-info {
    margin-top: 50px;
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
