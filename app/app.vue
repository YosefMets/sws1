<script setup>
import {useAppStore} from "../stores/appStore.js";

const { scrollY } = storeToRefs( useAppStore() );

if (process.client) {
  useEventListener( window, 'scroll', () => { scrollY.value = window.scrollY }, { passive: true } );
}
</script>

<template>
  <NuxtPage />
</template>