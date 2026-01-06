<script setup>
useHead({
  title: 'Stop Washing Socks',
  meta: [
    { name: 'description', content: 'Get 31 pairs of socks for $59.99 and forget about washing' },
    { name: 'keywords', content: 'ключевые, слова' },
    { property: 'og:title', content: 'Заголовок для соцсетей' }
  ]
})

import {useAppStore} from "../stores/appStore.js";
const { scrollY } = storeToRefs( useAppStore() );

if (process.client) {
  useEventListener( window, 'scroll', () => { scrollY.value = window.scrollY }, { passive: true } );
}
</script>

<template>
  <NuxtPage />
</template>