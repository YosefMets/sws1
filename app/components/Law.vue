<script setup>
const props = defineProps({
  is: {
    type: String,
    required: true
  }
})

console.log( props.is )

const { locale } = useI18n();
const loading = ref(true);
const text = ref(null);
text.value = await $fetch( `/${props.is}-${locale.value}.html` );
loading.value = false;
</script>

<template>
  <div class="law-content" v-html="text" />
</template>

<style>
.law-content {}
.law-content h2 {}
.law-content h3 {}
.law-content ul {}
.law-content ol {}
.law-content li {}
.law-content p {}
</style>