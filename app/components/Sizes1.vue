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

const choose = ( sz ) => {
  size.value = sz;
  emit('update:modelValue', sz)
}
watch( size, (n) => { emit('update:modelValue', n) })
</script>

<template>

  <div class="sizes-control">
    <span class="sizes-title">{{ $t('size') }}</span>
    <div v-for="sz in sizes" :class="['size-item', { curr: sz === size }]" @click="size = sz">
      {{ sz[regionCode] }}
    </div>
  </div>

</template>

<style scoped>
.sizes-control {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  gap: .5em;
  height: var(--cntl-h);
  background-color: #fff;
  border-radius: var(--br);
  cursor: text;
  font-size: 1rem;
  padding: .5em;
}
.sizes-title {
  display: flex;
  align-items: center;
  transform-origin: 0 50%;
  font-size: 13px;
  font-weight: 600;
  transition: transform linear .1s;
  white-space: nowrap;
}
.sizes-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  grid-template-rows: 5px;
  gap: .5em;
}

.size-item {
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 600;
  background-color: #eee;
  border-radius: calc( var(--br) - 2px );
  cursor: pointer;
  transition: all .1s;
}
.size-item.curr {
  background-color: #000;
  color: #fff;
}
</style>