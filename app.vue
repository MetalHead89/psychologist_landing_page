<template>
  <div class="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// const config = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'text/javascript',
      innerHTML: ' (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};' +
        'm[i].l=1*new Date();' +
        'for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}' +
        'k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})' +
        '(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");' +
        'ym(95436575, "init", {' +
        'clickmap:true,' +
        'trackLinks:true,' +
        'accurateTrackBounce:true,' +
        'webvisor:true' +
        '});'
    }
  ],
  meta: [
    { name: 'yandex-verification', content: 'fc4adc4832084876' }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
})

useSeoMeta({
  title: 'Психолог Екатерина Бакалова',
  description: 'Услуги психолога. Консультирую по вопросам "Как справиться с конфликтом?", ' +
    '"Как справиться с жизненным кризисом?", "Как повысить самооценку?", "Как побороть навязчивые мысли?", ' +
    '"Как преодолеть страх, тревогу, чувство неопределенности?", ' +
    '"Как преодолеть трудности в принятии жизненного выбора?" ' +
    'Адрес: г. Канск, ул. Цимлянская, д. 3',
  keywords: 'психолог,канск,иланский,консультация,конфликт,кризис,самооценка,помощь,страх,тревога,мысли'
})
</script>
