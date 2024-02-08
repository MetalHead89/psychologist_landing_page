<template>
  <div class="page-section about-me-section">
    <h2 class="about-me__title">
      <span class="accent-text">Добро пожаловать</span> на мой сайт!
    </h2>

    <NuxtImg
      src="/images/photo_v1.jpg"
      sizes="480px"
      format="webp"
      alt="Фотография"
      class="photo"
    />

    <p>
      Жизнь – это калейдоскоп событий, где яркие моменты соседствуют с темными полосами. Как и многие, я столкнулась с проблемами в юности. Обиды на родителей, зависимость от чужого мнения, деструктивные мысли по типу «У меня ничего не получится», «Я ничего не умею».
    </p>

    <p>
      Жизнь – это не всегда безоблачный путь. Мы сталкиваемся с потерями, кризисами, разочарованиями. Но важно не зацикливаться на негативе, а двигаться вперед. Я знаю, как это сделать, ведь я сама прошла через это.
    </p>

    <p>
      На своем пути я перепробовала множество различных психологических техник и практик. Именно комплексный подход помог мне перестроить мышление и обрести новое видение ситуации. Мой опыт – это не просто набор теоретических знаний. Это мой личный путь к гармонии с собой и миром. Я знаю, что такое разочарование, страх и неуверенность. Я знаю, как трудно сделать первый шаг к переменам.
    </p>

    <p>
      Я твердо уверена, что ничего не дается просто так. За каждым достижением стоит кропотливый труд. Хотите печь восхитительные торты? Нужно пробовать и совершенствовать свои навыки.  То же самое касается и нашей жизни: мы не можем изменить ее, действуя по старым сценариям и ожидая нового результата.
    </p>

    <p>
      Готовы сделать первый шаг к новой жизни? Я буду рада вам помочь!
    </p>

    <p class="consult-info">
      Консультирую online или в частном кабинете по адресу г.Канск, ул. Горького 41.
    </p>

    <p>
      Предварительная запись по телефону <a href="tel:+79029745983" class="link-global">+7 (902) 974 59-83</a> или через <a href="#feedback-section" class="link-global">форму</a> ниже.
    </p>

    <h3 class="social-media-title">
      Я в социальных сетях
    </h3>

    <ul class="social-media-links">
      <li><a href="https://vk.com/ekaterina.bakalova" class="link-global">Профиль в VK</a></li>
      <li><a href="https://vk.com/psycholog.bakalova" class="link-global">Сообщество «Психология на каждый день»</a></li>
    </ul>

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
