<template>
  <div class="footer">
    <div class="info">
      <div class="documents">
        <h3 class="title">
          {{ $t('footer.sections.documents.title') }}
        </h3>

        <NuxtLink
          :to="{ name: 'privacy' }"
          target="_blank"
          class="link"
        >
          {{ $t('footer.sections.documents.privacy_policy') }}
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
}
</style>
