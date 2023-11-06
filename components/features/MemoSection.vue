<!-- eslint-disable max-len -->
<template>
  <div class="memo-section">
    <h2 class="title">
      <span class="accent-text">Памятка</span> для клиента
    </h2>

    <div class="sections">
      <section class="section">
        <h3>Что ожидать от психологической консультации?</h3>
        <p>
          Психологическая консультация - это процесс, который требует времени и усилий. Не ждите, что за одну консультацию вы решите все свои проблемы.
        </p>
        <p>
          Психолог не дает готовых решений. Он помогает вам найти свои собственные пути решения проблем.
        </p>
        <p>
          Психологическая консультация - это конфиденциальный процесс. Психолог не имеет права разглашать информацию о вас без вашего согласия.
        </p>
      </section>

      <section class="section">
        <h3>Чего не ожидать от психологической консультации?</h3>
        <p>
          Психолог не сможет решить ваши проблемы за вас. Он может только помочь вам найти пути решения.
        </p>
        <p>
          Психолог не даст вам волшебную таблетку, которая сделает вашу жизнь идеальной.
        </p>
        <p>
          Психологическая консультация - это не волшебство. Она требует от вас готовности к изменениям и активной работы над собой.
        </p>
      </section>

      <section class="section">
        <h3>Советы для клиентов, которые хотят получить максимальную пользу от психологической консультации:</h3>
        <p>
          Будьте честны с собой и с психологом. Не бойтесь говорить о своих проблемах и чувствах.
        </p>
        <p>
          Активно участвуйте в процессе консультирования. Не ждите, что психолог все сделает за вас.
        </p>
        <p>
          Не бойтесь задавать вопросы. Если вы что-то не понимаете, обязательно спросите.
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.memo-section {
  padding: 8vh $content-padding;
  scroll-margin-top: 79px;

  .title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }

  .sections {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    max-width: 700px;

    h3 {
      text-align: center;
      font-size: 23px;
    }

    p {
      text-align: center;
    }
  }
}
</style>
