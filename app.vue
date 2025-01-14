<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <NuxtSnackbar />
    </ClientOnly>
    <UiLoadingOverlay />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const script = []

if (process.env.NODE_ENV === 'production') {
  script.push({
    type: 'text/javascript',
    innerHTML: ' (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};' +
      'm[i].l=1*new Date();' +
      'for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}' +
      'k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})' +
      '(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");' +
      `ym(${config.public.metrikaId}, "init", {` +
      'clickmap:true,' +
      'trackLinks:true,' +
      'accurateTrackBounce:true,' +
      'webvisor:true' +
      '});'
  })

  script.push({
    src: `https://www.googletagmanager.com/gtag/js?id=${config.public.gTagId}`,
    async: true
  })

  script.push({
    type: 'text/javascript',
    innerHTML: 'window.dataLayer = window.dataLayer || [];' +
      'function gtag(){dataLayer.push(arguments);}' +
      'gtag("js", new Date());' +
      `gtag("config", "${config.public.gTagId}");`
  })
}

useHead({
  script,
  meta: [
    { name: 'yandex-verification', content: config.public.yandexVerificationId as string }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
})

useSeoMeta({
  title: 'Психолог Екатерина Бакалова. г. Канск',
  description: 'Екатерина Бакалова, психолог-консультант в г. Канске. Оказываю квалифицированную психологическую помощь взрослым и подросткам. Конфликты в семье и на работе, кризисные состояния, низкая самооценка, страхи и тревоги, неразрешимые мысли - все это может стать причиной психологических проблем. В своей работе использую техники современных направлений консультирования',
  keywords: 'психолог,канск,иланский,подросток,взрослый,консультация,конфликт,кризис,самооценка,помощь,страх,тревога,мысли'
})
</script>
