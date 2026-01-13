<script setup>
import { ref, computed, defineProps, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: [String, Object], default: '' },
  readonly: Boolean,
  disabled: Boolean,
  options: { type: Array, default: () => [] },
  editable: { type: Boolean, default: true },
  clearable: Boolean,
  search: Boolean,
  // autoSelectFirst: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue']);

// Refs
const internalValue = ref(props.modelValue);
const searchValue = ref('');
const optionRefs = ref([]);
const expandOptions = ref(false);

// Computeds
const internalOptions = computed( () =>
    props.options?.map( opt => typeof opt === 'string' ? { text: opt, icon: '', value : ''  } : opt )
);
const fiteredOptions = computed( () =>
    internalOptions.value?.filter( ({ text }) =>
        text.toLowerCase().indexOf( internalValue.value.replace(/^ *| *$/g, '').toLowerCase() ) === 0 )
);
const displayedOptions = computed( () => props.editable ? fiteredOptions.value : internalOptions.value );
const isOptionsOpen = computed( () => props.options?.length && expandOptions.value );
const cssClasses = computed( () => ({
  'nin-dd': isOptionsOpen.value,
}))

// Functions
const closeOptions = () => {}

const go = async ( e, val = internalValue.value ) => {
  const value = internalOptions.value.find( ({ text }) => text === val )?.value || val;
  await emit( 'update:modelValue', value );
  internalValue.value = val;
  closeModal();
  e.target.blur();
}

const scrollToFirstMatchedOption = () => {
  const index = internalOptions.value.findIndex( ({ text }) =>
      text.toLowerCase().indexOf( searchValue.value.replace(/^ *| *$/g, '').toLowerCase() ) === 0 ) || 0
  const el = optionRefs.value[ index !== -1 ? index : 0 ];
  el?.scrollIntoView()
}

const openModal = () => {
  expandOptions.value = true
  history.pushState({ optionsOpen: true }, '');
  document.body.style.overflow = 'hidden'
  // console.log(history.state) // { optionsOpen: true }
}

const closeModal = () => {
  expandOptions.value = false
  history.back()
  document.body.style.overflow = ''
}

const handleBack = ( event ) => {
  if ( event.state?.optionsOpen ) {
    closeModal()
  }
  return;
  if ( expandOptions.value ) { // && isMobile
    expandOptions.value = false;
    return true
  }
  return false
}

onMounted( () => {
  window.addEventListener('popstate', handleBack)
})

onBeforeUnmount( () => {
  window.removeEventListener('popstate', handleBack)
})
</script>

<template>
  <div class="nin" :class="cssClasses">
    <label class="nin-lbl" aria-label="Поле ввода">
      <div class="nin-in-wr">
        <input
            v-model="internalValue"
            placeholder=" "
            class="nin-in"
            :readonly="!editable"
            @change="go"
            @focus="openModal"
            v-bind:type="$attrs.type"
            v-bind:name="$attrs.name"
            v-bind:autocomplete="$attrs.autocomplete"
            v-bind:required="$attrs.required"
            v-bind:id="$attrs.inputId"
            v-bind:min="$attrs.min"
            v-bind:max="$attrs.max"
        />
        <i class="nin-plh" role="presentation">
          <i>{{ placeholder }}</i>
        </i>
      </div>
    </label>

    <i v-if="internalOptions?.length" class="nin-v" role="button" @click="expandOptions ? closeModal : openModal">
      <svg class="nin-v-ic" viewBox="0 0 20 12" xmlns="http://www.w3.org/2000/svg">
        <polyline points="2,2 10,10 18,2"/>
      </svg>
    </i>

    <Transition name="nin-expand">
      <div v-if="isOptionsOpen" class="nin-ress-wr" role="listbox">
        <div v-if="search && !editable && internalOptions?.length > 4" class="nin-res-f-wr">
          <input v-model="searchValue" class="nin-res-f" placeholder="Quick search..." @input="scrollToFirstMatchedOption" />
        </div>
        <ul class="nin-ress">
          <li
              v-for="(res, q) in displayedOptions"
              :key="q"
              :ref="el => optionRefs[q] = el"
              class="nin-res"
              role="option"
              @click.stop.prevent="go($event, res.text)"
          >
            {{ res.icon || '' }} {{ res.text }}
          </li>
        </ul>
      </div>
    </Transition>

    <Transition name="nin-bd">
      <div v-if="isOptionsOpen" class="nin-bd" @click="closeModal" />
    </Transition>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }
:active, :hover, :focus { outline: 0; outline-offset: 0; }

.nin {
  /*--cntl-h: 60px;*/
  /*--br: 10px;*/

  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  height: var(--cntl-h);
  background-color: #fff;
  /*box-shadow: inset 0 0 0 .05rem var(--contr);*/
  border-radius: var(--br);
  cursor: text;
  /*padding-right: .5em;*/
  font-size: 1rem;
}
.nin.nin-dd {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.nin-lbl {
  /*display: grid;*/
  display: flex;
  grid-template-columns: auto 1fr;
  padding-left: .5em;
}
.nin-ic {
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: text;
  /*padding: 0 5px 0 10px;*/
  width: 40px;
  background-color: #ffffff66;
}
.nin-in-wr {
  position: relative;
  width: 100%;
}
.nin-sv,
.nin-in {
  /*font-size: 1.1rem;*/
  /*font-weight: 400;*/
  padding: 1.2em 0 0;
  font-size: 16px;
  font-weight: 600;
}
.nin-sv {
  display: none;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.nin-in {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  /*padding: 0;*/
  z-index: 10;
}

.nin-sm .nin-sv { display: flex; }
.nin-sm .nin-in { opacity: 0; cursor: pointer; }

.nin-plh {
  font-style: normal;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #000c;
  z-index: 20;
  transition: opacity .1s;
  cursor: text;
  width: 1px;
}
.nin-plh > i {
  font-style: normal;
  display: block;
  transform-origin: 0 50%;
  font-size: 13px;
  font-weight: 600;
  transition: transform linear .1s;
  white-space: nowrap;
}
.nin-in:focus + .nin-plh > i,
.nin-in:not(:placeholder-shown) + .nin-plh > i,
.nin-in.nin-in-fill + .nin-plh > i {
  transform: scale(.8) translateY(-1.2em);
  color: #0009;
}
.nin-in:focus + .nin-plh > i:after,
.nin-in:not(:placeholder-shown) + .nin-plh > i:after,
.nin-in.nin-in-fill + .nin-plh > i:after {
  content: ':';
}
.nin-v {
  font-style: normal;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 .5em;
}
.nin-v-ic {
  width: 1rem;
  height: .6rem;
  display: inline-block;
  stroke: #000;
  stroke-width: .1rem;
}
.nin-v-ic > polyline {
  fill: transparent;
  stroke: inherit;
  stroke-width: inherit;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
.nin-ress-wr {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 2000;

  background-color: #fff;
  box-shadow: 0 1em 1em -1em #00000066;
  margin: 0;
  padding: 0;
  width: 100%;
  /*transform-origin: top;*/
  max-height: 16em;
  overflow-y: hidden;
  border-radius: 0 0 var(--br) var(--br);
  border-top-color: #ccc;
  border-top-style: solid;
  border-top-width: .1rem;
  display: grid;
  grid-template-rows: auto 1fr;
}
.nin-res-f-wr {
  padding: .5em;
  background-color: #f3f3f3;
}
.nin-res-f {
  appearance: none;
  /*border-radius: var(--br);*/
  border: 0px solid #ccc;
  background-color: transparent;
  width: 100%;
  font-size: 1.2rem;
}
.nin-res-f::placeholder {
  color: #999;
}
.nin-ress {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 100%;
  overflow-y: auto;
}
.nin-res {
  font-size: 1.2rem;
  font-weight: 600;
  padding: .5em;
  cursor: pointer;
}
.nin-res:hover { background-color: #eee; }
.nin-res.nin-res-sel {
  background-color: #000;
  color: #fff;
}

.nin-bd {
  /*display: block;*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background-color: #00000066;*/
  z-index: 1000;
}

@media (max-width: 480px) {
  .nin-ress-wr {
    position: fixed;
    left: 0;
    right: 0;
    top: unset;
    bottom: 0;
    /*translate: -50% -50%;*/
    /*padding: 1rem;*/
    max-height: 50dvh;
    background-color: transparent;
    z-index: 2000;
    width: 100vw;
    border-radius: calc( var(--br) * 2 ) calc( var(--br) * 2 ) 0 0;
  }
  .nin-res-f-wr {
    padding: .6em 2rem;
  }
  .nin-res-f {
    font-size: 1.6rem;
  }
  .nin-ress {
    background-color: #fff;
    max-height: none;
    height: 100%;
    overflow-y: auto;
  }
  .nin-res {
    font-size: 1.6rem;
    /*font-weight: 600;*/
    padding: .6em 2rem;
  }
  .nin-bd {
    /*display: block;*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #00000066;
    z-index: 1000;
  }

  .nin-expand-enter-active,
  .nin-expand-leave-active {
    transition: transform .2s;
  }
  .nin-expand-enter-from,
  .nin-expand-leave-to {
    transform: translateY(100%);
  }

  .nin-bd-enter-active,
  .nin-bd-leave-active {
    transition: opacity .2s;
  }
  .nin-bd-enter-from,
  .nin-bd-leave-to {
    opacity: 0;
  }
}
</style>