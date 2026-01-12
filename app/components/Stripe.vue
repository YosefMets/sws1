<script setup>
import { useRuntimeConfig, useClientStripe } from "#imports";
// import { useRuntimeConfig } from '#imports'
const { loadStripe } = useClientStripe();
const config = useRuntimeConfig()
const stripe = ref(null);
const cardDomElement = ref(null);

onMounted( async () => {
  stripe.value = await loadStripe(config.public.stripe.key);
  const elements = stripe.value.elements()
  const cardElement = elements.create('card')

  console.log( cardElement );
  cardElement.mount( cardDomElement.value )
})

onBeforeUnmount( () => {
  cardElement.destroy()
})
//
// defineExpose({
//   stripe,
//   cardElement
// })
</script>

<template>
  <div class="stripe-wr" ref="cardDomElement" qwe="qwe" />
</template>