<script setup>
const emit = defineEmits(['update:modelValue', 'close']);

const props = defineProps({
  show: Boolean,
  x: { type: Boolean, default: true },
  easyClose: { type: Boolean, default: true },
  from: { type: String, default: 'bottom' }, // bottom | left | right | top
  width: { type: String, default: 'full' }, // full | almost
  height: { type: String, default: 'fit-content' }, // fit-content | full | half
  fog: { type: Boolean, default: true }
});

const fromClass = computed( () => `modal-from-${props.from}` );
const modalWidthClass = computed( () => `modal-width-${props.width}` );
const modalHeightClass = computed( () => `modal-height-${props.height}` );
const borderRadius = computed( () => {
  if ( props.from === 'bottom')
    return ( ['full'].includes( props.height ) ) ? 0 : 'var(--br) var(--br) 0 0'
  if ( props.from === 'top')
    return ( ['full'].includes( props.height ) ) ? 0 : '0 0 var(--br) var(--br)'
  if ( props.from === 'left' )
    return ( ['full'].includes( props.width ) ) ? 0 : 'var(--br) 0 0 var(--br)'
  if ( props.from === 'right' )
    return ( ['full'].includes( props.width ) ) ? 0 : '0 var(--br) var(--br) 0'
})

const close = () => {
  if ( !props.easyClose ) return

  if (isAndroid.value && props.show) {
    window.history.back() // Удаляем состояние из истории
  }
  emit('close');
}

const { isAndroid } = useDevice()

// Блокировка скролла
watch(() => props.show, (isOpen) => {
  if (isAndroid.value && isOpen) {
    document.body.style.overflow = 'hidden'
    // НЕ делаем pushState
  } else {
    document.body.style.overflow = ''
  }
})

const handlePopState = (event) => {
  if (props.show) {
    event.preventDefault() // Предотвращаем навигацию
    emit('close')
  }
}

onMounted(() => {
  if (isAndroid.value) {
    window.addEventListener('popstate', handlePopState)
    // Запрещаем навигацию при открытом модале
    window.history.pushState(null, '', window.location.href)
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  if (isAndroid.value) {
    window.removeEventListener('popstate', handlePopState)
    if (window.cordova || window.Capacitor) {
      document.removeEventListener('backbutton', handleBack, false)
    }
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">

      <div v-if="show"
           :class="['fog', fromClass, modalWidthClass, modalHeightClass, { 'no-fog': !fog }]"
           @click="close">

        <div class="modal-container-wr" @click.stop.prevent>
<!--          <div class="modal-container scroll">-->
            <slot />
<!--          </div>-->
        </div>

<!--        <div v-if="easyClose" class="fog-x" @click="emit('close')" />-->

      </div>

    </Transition>
  </Teleport>
</template>

<style scoped>
.fog {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: end;
  align-items: center;
  overflow-y: auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100dvh;
  z-index: 10000;
}
.fog.modal-side-left { justify-items: start; }

.fog:after {
  content: '';
  background-color: var(--fog);
  /*backdrop-filter: blur(.2rem);*/
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.fog.no-fog:after { background-color: transparent; }

.modal-container-wr {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 10;
  max-height: 100dvh;
  border-radius: v-bind( borderRadius );
  box-shadow: 0 .2rem 1rem -.7rem #000000;
  overflow: hidden;
}
.fog.modal-width-almost > .modal-container-wr { width: calc( 100% - 40px ) }
.fog.modal-height-full > .modal-container-wr { height: 100%; }
.fog.modal-height-half > .modal-container-wr { height: 50%; }

.modal-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: block;
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


.modal-enter-active {
  transition: opacity 0s, background-color .1s;
  overflow: hidden;
}
.modal-leave-active {
  transition: opacity 0s .1s, background-color .1s;
  overflow: hidden;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active:after,
.modal-leave-active:after {
  transition: opacity .1s;
}
.modal-enter-from:after,
.modal-leave-to:after {
  opacity: 0;
}

.modal-enter-active .modal-container-wr,
.modal-leave-active .modal-container-wr {
  transition: transform .1s, opacity .1s;
}
.modal-enter-from .modal-container-wr,
.modal-leave-to .modal-container-wr {
  transform: translateX(100%);
}
.modal-enter-from.modal-from-bottom .modal-container-wr,
.modal-leave-to.modal-from-bottom .modal-container-wr {
  transform: translateY(-100%);
}
.modal-enter-from.modal-from-left .modal-container-wr,
.modal-leave-to.modal-from-left .modal-container-wr {
  transform: translateX(-100%);
}

@media (max-width: 480px) {
  .fog {
    width: unset;
    right: 0;
    top: unset;
  }
  .modal-container-wr {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .modal-enter-active {
    transition: opacity 0s, background-color .5s;
    overflow: hidden;
  }
  .modal-leave-active {
    transition: opacity 0s .5s, background-color .5s;
    overflow: hidden;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active:after,
  .modal-leave-active:after {
    transition: opacity .5s;
  }
  .modal-enter-from:after,
  .modal-leave-to:after {
    opacity: 0;
  }
  .modal-enter-active .modal-container-wr,
  .modal-leave-active .modal-container-wr {
    transition: transform .5s, opacity .5s;
  }
  .modal-enter-from.modal-from-bottom .modal-container-wr,
  .modal-leave-to.modal-from-bottom .modal-container-wr {
    transform: translateY(100%);
  }
  .modal-enter-from.modal-from-left .modal-container-wr,
  .modal-leave-to.modal-from-left .modal-container-wr {
    transform: translateX(100%);
  }
}
</style>