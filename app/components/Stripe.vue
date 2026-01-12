<script setup>
import { useRuntimeConfig, useClientStripe } from "#imports";
// import { useRuntimeConfig } from '#imports'
const { loadStripe } = useClientStripe();
const config = useRuntimeConfig()
const stripe = ref(null);
const cardElement = ref(null);
const cardDomElement = ref(null);
const { locale} = useI18n();
const isFocused = ref(false);

const options = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Montserrat", Helvetica, sans-serif',
      fontSize: '16px',
      fontWeight: '600',
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

const focus = () => {
  cardElement.value.focus();
  isFocused.value = true;
}

onMounted( async () => {
  if (!process.client) return
  stripe.value = await loadStripe( config.public.stripe.key );
  const elements = stripe.value.elements({ locale: locale.value });
  cardElement.value = elements.create( 'card', options )

  console.log( cardElement );
  cardElement.value.mount( cardDomElement.value )
})

onBeforeUnmount( () => {
  cardElement.value.destroy()
})

// defineExpose({
//   stripe,
//   cardElement
// })
</script>

<template>
  <div :class="['stripe-container', { focus: isFocused }]" @click="focus">
    <i class="stripe-label"><i>{{ $t('creditDebitCard') }}</i></i>
    <div ref="cardDomElement" />
  </div>
</template>

<style scoped>
.stripe-container {
  position: relative;
  background-color: #fff;
  height: var(--cntl-h);
  border-radius: var(--br);
  display: grid;
  align-items: center;
  padding: 1.6em .5em 0;
}
.stripe-label {
  position: absolute;
  left: 0;
  top: 50%;
  translate: .5em -50%;
  font-weight: 600;

  font-style: normal;
  color: #000c;
  z-index: 20;
  transition: opacity .1s;
  cursor: text;
  width: 1px;
}
.stripe-label > i {
  font-style: normal;
  display: block;
  transform-origin: 0 50%;
  font-size: 13px;
  font-weight: 600;
  transition: transform linear .1s;
  white-space: nowrap;
}
.focus > .stripe-label > i {
  transform: scale(.8) translateY(-1.2em);
  color: #0009;
}
.focus > .stripe-label > i:after {
  content: ':';
}

.stripe-container > div {
  width: 100%;
  translate: 0 1000%;
}
.stripe-container.focus > div { translate: 0 0; }
</style>

<style>
.StripeElement iframe {
  font-family: Montserrat, sans-serif !important;
}
</style>