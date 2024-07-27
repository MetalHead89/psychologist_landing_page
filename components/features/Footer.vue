<template>
  <div class="footer">
    <div class="info">
      <div
        v-for="({ title, items }, index) in sections"
        :key="index"
        class="section"
      >
        <h3 class="title">
          {{ title }}
        </h3>

        <NuxtLink
          v-for="({ title: itemTitle, to, target }, itemIndex) in items"
          :key="itemIndex"
          :to="to"
          :target="target"
          class="link"
        >
          {{ itemTitle }}
        </NuxtLink>
      </div>

      <!-- <div class="psychological-help">
        <UiPsychologicalHelpPhone />
      </div> -->
    </div>
    <div class="copyright-wrapper">
      <UiCopyright />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const sections = [
  {
    title: t('footer.sections.documents.title'),
    items: [
      {
        title: t('footer.sections.documents.privacy_policy'),
        to: { name: 'privacy' },
        target: '_blank'
      }
    ]
  },

  {
    title: 'Статьи',
    items: [
      {
        title: 'Как завершить межличностный конфликт и избавиться от негативных эмоций? Из опыта работы.',
        to: { name: 'blog-kak_zavershit_mezhlichnostnyj_konflikt' },
        target: '_self'
      },
      {
        title: 'Работа над самооценкой. Из частной практики.',
        to: { name: 'blog-rabota_nad_samoocenkoj' },
        target: '_self'
      },
      {
        title: '«Токсичное» отношение матери к ребенку.',
        to: { name: 'blog-toksichnaja_mama' },
        target: '_self'
      }
    ]
  }
]
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 3vh $content-padding;
  background: $primary-color;
  color: #ffffff;

  @media screen and (min-width: $xl) {
    gap: 5vh;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 50px;

    @media screen and (min-width: $lg) {
      flex-direction: row;
    }

    @media screen and (min-width: $xl) {
      gap: 2.5vw;
    }
  }

  .link {
    color: #ffffff;
    text-decoration: none;
  }

  .psychological-help {
    flex-grow: 1;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
