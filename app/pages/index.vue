<script setup>
import {useAppStore} from "../../stores/appStore.js";
import MoBottom from "../components/MoBottom.vue";
import SectionPleasure from "../components/SectionPleasure.vue";
import SectionQuality from "../components/SectionQuality.vue";

const { config, scrollY } = storeToRefs( useAppStore() );
const { price: $, oldPrice: old$ } = config.value;

const isScrollDown = computed( () => process.client ? (scrollY.value + 50 > window.innerHeight / 2) : 0 );

const { locale, locales } = useI18n()
</script>

<template>

  <div>

    <div :class="['logo', { permanent: isScrollDown }]">
      <Logo />
    </div>

    <SectionCta3 />
    <SectionPleasure />
    <SectionExplanation />
    <SectionForm />

<!--    <SectionQuality />-->

<!--    <MoBottom />-->
  </div>
</template>

<style scoped>
.logo {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3000;
  /*display: flex;*/
  /*justify-content: center;*/
  transform: translate(-100%, -50%);
  /*margin-left: -12rem;*/
  transition: transform .1s;
  transform-origin: right top;
}
.logo.permanent {
  position: fixed;
  top: 0;
  transform: translate(-100%, -5%) scale(.5);
}
.logo-per {
  position: sticky;
  top: 0;
  font-size: 1.5rem;
  z-index: 2500;
  translate: -100% -10%;
  left: 50%;
}


.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.fh {
  min-height: 100vh;
}

.old-price:after {
  content: '';
  width: 100%;
  height: 10%;
  background-color: #f00;
  position: absolute;
  left: 0;
  top: 50%;
  translate: 0 -50%;
}

@media (max-width: 480px) {
  .logo,
  .logo.permanent {
    position: absolute;
    margin-left: 0;
    /*top: calc( var(--main-top) / 2 );*/
    top: 0;
    /*transform: translate(-50%, -50%);*/
    transform: translate(-50%, 0);
    transform-origin: center top;
  }

  .testimonials-wr {}
  .testimonials-wr:before { content: none; }

}
</style>