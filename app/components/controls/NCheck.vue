<script setup>
import SvgCheck from "~/components/imgs/svg-check.vue";

const props = defineProps({
  modelValue: [String, Boolean],
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label class="nch">
    <input type="checkbox"
           v-bind="$attrs"
           class="nch-i"
           :checked="modelValue"
           @change="$emit('update:modelValue', $event.target.checked)">
    <span class="nch-b">
      <SvgCheck />
    </span>
    <span class="nch-t">
      <slot/>
    </span>
  </label>
</template>

<style scoped>
.nch {
  position: relative;
  display: inline-block;

  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-gap: .5rem;
  align-items: start;
}
.nch-i {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0;
  opacity: 0;
}
.nch-b {
  position: relative;
  /*font-size: .7rem;*/
  /*display: grid;*/
  /*grid-template-columns: auto 1fr;*/
  /*grid-gap: .5rem;*/
}
.nch-b:before {
  content: '';
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: var(--br);
  background-color: #fff;
  cursor: pointer;
}
.nch-i + .nch-b > svg {
  position: absolute;
  left: .2rem;
  top: 50%;
  translate: 0 -50%;
  opacity: 0;
  /*transition: opacity .1s;*/
  width: 1.2rem;
  height: 1.2rem;
  stroke-width: .2rem;
  cursor: pointer;
}
.nch-i:checked + .nch-b:before {
}
.nch-i:checked + .nch-b > svg {
  opacity: 1;
}

.nch-t {
  display: block;
  /*margin-top: .2rem;*/
  font-size: 1.2rem;
  line-height: 1.4em;
}
</style>
