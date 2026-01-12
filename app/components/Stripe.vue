<script setup>
import { useRuntimeConfig, useClientStripe } from "#imports";
// import { useRuntimeConfig } from '#imports'
const { loadStripe } = useClientStripe();
const config = useRuntimeConfig()
const stripe = ref(null);
const cardElement = ref(null);
const cardDomElement = ref(null);

const options = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Montserrat", Helvetica, sans-serif',
      fontSize: '13px',
      fontWeight: '500',
      '::placeholder': {
        color: '#000'
      },
      iconColor: '#000'
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  },
  hidePostalCode: true,
  hideIcon: true,
  disabled: false,
  iconStyle: 'solid' // 'solid' или 'default'
}

onMounted( async () => {
  if (!process.client) return
  stripe.value = await loadStripe( config.public.stripe.key );
  const elements = stripe.value.elements()
  cardElement.value = elements.create( 'card', options )

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