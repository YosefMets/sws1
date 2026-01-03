<script setup>
import {useAppStore} from "../../stores/appStore.js";

const props = defineProps({
  amount: { type: Number, required: true },
  tag: { type: String, default: 'span' },
  formatted: Boolean
})

const { formatPlain, formatWithSuperscript } = useCurrencyFormatter()

const { currency } = storeToRefs( useAppStore() );

const plainPrice = computed( () => formatPlain( props.amount, currency.value ))
const formattedPrice = computed( () => formatWithSuperscript( props.amount, currency.value ))
console.log(formattedPrice.value)
</script>

<template>
  <component :is="tag" class="price">
    <span v-if="!formatted" v-html="plainPrice" />
    <span v-else v-html="formattedPrice" />
  </component>
</template>


<style scoped>
.price {
  /*font-weight: 600;*/
  white-space: nowrap;
  position: relative;
}

/* Стили для HTML внутри v-html */
:deep(.currency-symbol) {
  /*font-size: 0.8em;*/
  vertical-align: top;
  margin-right: 1px;
}

:deep(.integer-part) {
  font-size: 1em;
}

:deep(.decimal-separator) {
  font-size: 0.8em;
  vertical-align: top;
}

:deep(.fraction-part) {
  /*
  font-size: 0.6em;
  vertical-align: top;
  position: relative;
  top: -0.3em;
  */
  vertical-align: super;
  font-size: 50%;
  line-height: 1em;
}
</style>