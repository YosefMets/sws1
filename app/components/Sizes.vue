<script setup>
import NInput from "~/components/controls/NInput.vue";
import {useAppStore} from "../../stores/appStore.js";

const { sizes, countryIso } = storeToRefs( useAppStore() );

const size = ref(null);

const regionCode = computed( () => {
  if (countryIso.value.toLowerCase() === 'us') return 'us'
  if (countryIso.value.toLowerCase() === 'uk') return 'uk'
  return 'eu'
} )
</script>

<template>

  <NInput v-model="size"
          required
          :placeholder="$t('size')"
          :options="sizes.map( size => size[regionCode] )"
          :select="true" />

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