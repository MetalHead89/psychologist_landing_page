<template>
  <div class="app">
    <NuxtPage />
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
}

useHead({
  script,
  meta: [
    { name: 'yandex-verification', content: 'fc4adc4832084876' }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
})

useSeoMeta({
  title: 'Психолог Екатерина Бакалова. г. Канск',
  description: 'Екатерина Бакалова, психолог-консультант в г. Канске. Оказываю квалифицированную псиологическую ' +
    'помощь взрослым и детям в решении жизненных психологических трудностей. Конфликты в семье и на работе, ' +
    'кризисные состояния, низкая самооценка, страхи и тревоги, неразрешимые мысли - все это может стать причиной ' +
    'психологических проблем. Гарантирую индивидуальный подход к каждому клиенту и конфиденциальность.',
  keywords: 'психолог,канск,иланский,детский,взрослый,консультация,конфликт,кризис,самооценка,помощь,' +
    'страх,тревога,мысли'
})
</script>
