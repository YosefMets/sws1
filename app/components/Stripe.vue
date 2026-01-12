<script setup>
import { useRuntimeConfig, useClientStripe } from "#imports";
// import { useRuntimeConfig } from '#imports'
const { loadStripe } = useClientStripe();
const config = useRuntimeConfig()
const stripe = ref(null);
const cardElement = ref(null);
const cardDomElement = ref(null);

onMounted( async () => {
  if (!process.client) return
  stripe.value = await loadStripe(config.public.stripe.key);
  const elements = stripe.value.elements()
  cardElement.value = elements.create('card')

  console.log( cardElement );
  cardElement.value.mount( cardDomElement.value )
})

onBeforeUnmount( () => {
  cardElement.value.destroy()
})
//
// defineExpose({
//   stripe,
//   cardElement
// })
</script>

<template>
  <div class="stripe-wr" ref="cardDomElement" />
</template>