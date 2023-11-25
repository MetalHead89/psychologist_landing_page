<template>
  <i18n-t
    keypath="ui.help_phone.text"
    tag="h2"
    class="psychological-help-phone"
    scope="global"
  >
    <template #phone>
      <span>{{ $t('ui.help_phone.phone') }}</span>
    </template>
  </i18n-t>
</template>

<style lang="scss" scoped>
.psychological-help-phone {
  margin: 0;
  text-align: center;

  @media screen and (min-width: $md) {
    text-align: left;
  }
}
</style>
