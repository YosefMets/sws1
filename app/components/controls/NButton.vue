<script setup>
import { NuxtLink } from '#components'

const props = defineProps({
  to: Object,
  style: String, // light, middle, style1
});

const styles = computed( () => ({
  'btn-stl1': props.style === 'style1',
  'btn-stl2': props.style === 'style2',
  'btn-stl3': props.style === 'style3',
  'btn-stl4': props.style === 'style4',
}));
</script>

<template>
  <Component :is="to ? NuxtLink : 'button'"
             :to="to || undefined"
             :class="['nst-btn', styles]">
    <slot />
  </Component>
</template>

<style scoped>

.nst-btn {
  --btn-h: 5rem;
  position: relative;
  background-color: #c00;
  color: #fff;
  border: solid .5rem transparent;
  border-radius: var(--br);
  padding: .6rem 1rem;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.2em;
  font-weight: 600;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
  text-decoration: none;
  min-height: var(--btn-h);
  transition: background-image .2s;

  /*box-shadow: 0 .1rem 0 .2rem #fff;*/
  /*box-sizing: content-box;*/
}
.nst-btn:hover {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+Cg==');
}

.btn-stl1 {
  background-color: transparent;
  border-color: transparent;
  box-shadow: 0 0 0 0 transparent;
  color: #000;
  /*text-shadow: .05rem .05rem #fff;*/
  font-weight: 500;
}
</style>