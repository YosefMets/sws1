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
        color: '#0006'
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
  const elements = stripe.value.elements({
    locale: locale.value,
    fonts: [
      { cssSrc: 'https://fonts.googleapis.com/css?family=Montserrat:400,600' }
    ]
  });
  cardElement.value = elements.create( 'card', options )

  console.log( cardElement );
  cardElement.value.mount( cardDomElement.value );

  let hadInput = false;
  cardElement.value.on( 'focus', () => { isFocused.value = true; });
  cardElement.value.on( 'blur', () => {
    if (!hadInput) {
      isFocused.value = false
    }
    hadInput = false
  });
  cardElement.value.on( 'change', ( event ) => {
    hadInput = !event.empty;
    // if ( event.empty ) isFocused.value = false;
    // console.log( event.complete )
  })
})

onBeforeUnmount( () => {
  cardElement.value.destroy()
})

defineExpose({
  stripe,
  cardElement
})
</script>

<template>
  <div :class="['stripe-container', { focus: isFocused }]">
    <i class="stripe-label">
      <i>
        {{ $t('creditDebitCard') }} ({{ $t('poweredBy') }}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" viewBox="54 36 360.02 149.84" class="stripe-logo">
          <g>
            <path class="st0" d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3   c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z    M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z"/>
            <path class="st0" d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3   c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1   c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z"/> 	<polygon class="st0" points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3  "/> 	<rect x="223.8" y="69.3" class="st0" width="25.1" height="87.5"/>
            <path class="st0" d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z"/>
            <path class="st0" d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135   c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z"/>
            <path class="st0" d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6   C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7   c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z"/>
          </g></svg>)
      </i></i>
    <label @click="focus" />
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
.stripe-logo {
  width: 32px;
  display: inline-block;
  position: relative;
  top: 0.2em;
}
.focus > .stripe-label > i {
  transform: scale(.8) translateY(-1.2em);
  color: #0009;
  fill: #0009;
}
.focus > .stripe-label > i:after {
  content: ':';
}
.focus .stripe-logo { top: .15em; }

.stripe-container > label {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background-color: #635bff11;*/
  z-index: 30;
}
.stripe-container.focus > label { pointer-events: none; }
.stripe-container > div {
  width: 100%;
  opacity: 0;
}
.stripe-container.focus > div { opacity: 1; }
</style>

<style>
/*.StripeElement iframe {*/
/*  font-family: Montserrat, sans-serif !important;*/
/*}*/
</style>