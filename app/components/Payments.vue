<script setup>
import SvgVisa from "~/components/imgs/svg-visa.vue";
import SvgMastercard from "~/components/imgs/svg-mastercard.vue";
import SvgMaestro from "~/components/imgs/svg-maestro.vue";
import SvgAmex from "~/components/imgs/svg-amex.vue";
import SvgCarteBancaire from "~/components/imgs/svg-carte-bancaire.vue";
import SvgDinersClub from "~/components/imgs/svg-diners-club.vue";
import SvgDiscover from "~/components/imgs/svg-discover.vue";
import SvgJcb from "~/components/imgs/svg-jcb.vue";
import SvgUnionPay from "~/components/imgs/svg-union-pay.vue";
</script>

<template>
  <ul class="payments">
    <li class="payment"><SvgVisa /></li>
    <li class="payment"><SvgMastercard /></li>
    <li class="payment"><SvgMaestro /></li>
    <li class="payment"><SvgAmex /></li>
    <li class="payment"><SvgCarteBancaire /></li>
    <li class="payment"><SvgDinersClub /></li>
    <li class="payment"><SvgDiscover /></li>
    <li class="payment"><SvgJcb /></li>
    <li class="payment"><SvgUnionPay /></li>
  </ul>
</template>

<style scoped>
.payments {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  grid-gap: .2rem;

  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
}
.payment {
  margin: 0;
  /* padding: .5rem; */
  background-color: #fff;
  border-radius: var(--br);
  /*width: 4.5rem;*/
  /*height: 2.5rem;*/
  aspect-ratio: 1.8 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.payment > img,
.payment > svg {
  object-position: 50% 50%;
  object-fit: contain;
  width: 70%;
  height: 70%;
}

@media (max-width: 480px) {
  .payments { justify-content: center; }
}
</style>
