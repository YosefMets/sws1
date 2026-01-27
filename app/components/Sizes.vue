<script setup>
import {useAppStore} from "../../stores/appStore.js";
import NInput1 from "./controls/NInput1.vue";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const { sizes, countryIso } = storeToRefs( useAppStore() );

const size = ref(null);

const regionCode = computed( () => {
  if (countryIso.value.toLowerCase() === 'us') return 'us'
  if (countryIso.value.toLowerCase() === 'uk') return 'uk'
  return 'eu'
})

watch( size, (n) => { emit('update:modelValue', sizes.value.find( ({ name }) => name === size.value )) })
</script>

<template>

  <NInput1 v-model="size"
           required
           :placeholder="$t('size')"
           :options="sizes.map( size => ({ text: size[regionCode], value: size.name }) )"
           :editable="false" />

</template>

<style scoped>
.sizes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  /*grid-template-columns: re;*/
  gap: 1rem;
}

.size {
  height: var(--cntl-h);
  border: .2rem solid #fff;
  display: flex;
  align-items: center;
  border-radius: var(--br);
  padding: 0 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}
</style>