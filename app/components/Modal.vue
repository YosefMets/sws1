<script setup>
// import ModalBase from "./ModalBase.vue";

const emit = defineEmits(['update:modelValue', 'close']);

const props = defineProps({
  show: Boolean,
  x: { type: Boolean, default: true },
  easyClose: { type: Boolean, default: true },
  from: { type: String, default: 'bottom' }, // bottom | left | right | top
  width: { type: String, default: 'full' }, // full | almost
  height: { type: String, default: 'fit-content' }, // fit-content | full | half | app
  fog: { type: Boolean, default: true }
});

const slots = useSlots();
</script>

<template>
  <ModalBase :show="show"
             :x="x"
             :easyClose="easyClose"
             :from="from"
             :width="width"
             :height="height"
             :fog="fog"
             @close="emit('close')">

    <div class="modal-container scroll">

      <div>
        <h2 v-if="slots.header" :class="['mdl-ttl', { 'mdl-ttl-x': x }]">
          <slot name="header" />
        </h2>
        <slot />
      </div>

      <template v-if="slots.footer" class="mdx-footer-wr">
        <div class="mdx-footer-space">
          <slot name="footer" />
        </div>
        <div class="mdx-footer">
          <slot name="footer" />
        </div>
      </template>

      <div v-if="x" class="mdl-x-wr">
        <span class="mdl-x" @click="emit('close')">X</span>
      </div>

    </div>
  </ModalBase>
</template>

<style scoped>
.modal-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /*background-color: #fff;*/
  padding: 3rem;
  overflow: auto;
  /*display: grid;*/
  grid-template-rows: 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: row;

  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: space-between;*/
}

.mdl-ttl {
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 1rem;
  position: relative;
}
.mdl-ttl.empty { height: 0; overflow: hidden; margin: 0; }
.mdl-ttl-min {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 1rem;
  position: relative;
}

.mdl-ttl-x {
  /*margin-right: 2rem;*/
}
.mdl-x-wr {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  z-index: 100;
  display: block;
  width: 1rem;
  height: 1rem;
}
.ic-x.mdl-x {
  width: 100%;
  height: 100%;
}
.fog-x {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: default;
  z-index: 5;
}

.mdx-footer-space {
  visibility: hidden;
}
.mdx-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 3rem;
  z-index: 50;
  /*padding-top: 2rem;*/
  background-color: inherit;
  /*margin-bottom: -3em;*/
}

@media (max-width: 480px) {
  .modal-container {
    padding: 1.5rem;
  }
  .mdx-footer {
    /*padding: 0 1.5rem;*/
    left: 1.5rem;
    right: 1.5rem;
    bottom: 1.5rem;
    /*margin-bottom: -1.5rem;*/
  }
  .mdx-footer:after { height: 1.5rem; }

  .mc-w-s,
  .mc-w-m,
  .mc-w-l,
  .mc-w-full { width: 100%; }

  .mc-h-full { border-radius: 0; }

  .mdl-ttl-x {
    margin-right: 3rem;
  }
  .mdl-x-wr {
    /*position: fixed;*/
    /*right: 1.5rem;*/
    /*top: 0;*/
    /*translate: 0 -50%;*/
    /*cursor: pointer;*/
    /*z-index: 1;*/
    width: 3rem;
    height: 3rem;
    background-color: var(--bg);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ic-x.mdl-x {
    width: 40%;
    height: 40%;
  }
}
</style>