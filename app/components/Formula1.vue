<script setup>
import SvgSock from "~/components/imgs/svg-sock.vue";
import SvgWashingMachine from "~/components/imgs/SvgWashingMachine.vue";

const { t } = useI18n();

const stopIt = computed( () => Array(20).fill( t('stopIt') ).join(' • ') );
</script>

<template>
  <div class="formula">
    <div class="formula-wr">
      <div class="socks-in">
        <SvgSock class="f-sock" />
        <SvgSock class="f-sock" />
        <SvgSock class="f-sock" />
        <SvgSock class="f-sock" />
      </div>
      +
      <div class="wm">
        <NuxtImg provider="cloudinary" src="washing-machine-mini.avif" alt="" :lazy="true" />
<!--        <SvgWashingMachine class="washing-machine" />-->
<!--        <div class="emoji">🤯</div>&lt;!&ndash;🤔😡🤬🤯&ndash;&gt;-->
      </div>
      =
      <div class="socks-out">
        <SvgSock class="f-sock" />
        <SvgSock class="f-sock" />
        <SvgSock class="f-sock" />
      </div>
    </div>

    <div>
      <div class="stripe1">{{ stopIt }}</div>
      <div class="stripe1">{{ stopIt }}</div>
    </div>
<!--    <div class="stop-it">-->
<!--      <div class="stripe">{{ stopIt }}</div>-->
<!--    </div>-->

  </div>
</template>

<style scoped>
.formula {
  position: relative;
  padding: 2.4rem 0;
  /*margin-bottom: 1rem;*/
  /*margin-top: 0rem;*/
  --bottom: 2rem;
  overflow: hidden;
}
.formula-wr {
  position: relative;
  display: flex;
  grid-gap: .5rem;
  justify-content: left;
  align-items: center;
  font-weight: 500;
  font-size: 4rem;
  color: #fff;
  padding-left: 4rem;
  z-index: 5;
  margin-bottom: var(--bottom);
}

.socks-in,
.socks-out {
  display: flex;
}

.f-sock {
  display: block;
  rotate: -15deg;
}
.socks-in > .f-sock:nth-child(odd) { margin-top: 0; }
.socks-in > .f-sock:nth-child(even) { margin-left: -.5rem; }

.socks-out > .f-sock:nth-child(1) { scale: 1; fill: #444; }
.socks-out > .f-sock:nth-child(2) { scale: .85; }
.socks-out > .f-sock:nth-child(3) { scale: 1.15; fill: #303030; }

.wm {
  position: relative;
  width: 5rem;
  height: 7.1rem;
}
.wm > img {
  object-fit: contain;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
}
.washing-machine {
  position: relative;
  z-index: 1;
  display: none;
}
.emoji {
  display: none;
  position: absolute;
  top: 130%;
  left: 50%;
  translate: -50% -50%;
}

.stop-it {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /*margin-left: -4rem;*/
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 2;
  translate: 0 calc(-1* var(--bottom));

  /*display: none;*/
}
.stripe {
  /*width: 50rem;*/
  white-space: nowrap;
  overflow: hidden;
  background-color: #ffee0099;
  color: #000;
  font-size: 1rem;
  padding: .2rem;
  transform-origin: 0 100%;
  rotate: -4deg;
  font-weight: 600;
  /*box-shadow: 0 .2rem 0 0 #00000033;*/
  /*margin-bottom: -6.2rem;*/
  border: solid #000;
  border-width: 0 0;
  position: absolute;
}
.stripe1 {
  /*width: 50rem;*/
  white-space: nowrap;
  overflow: hidden;
  background-color: #ffee0099;
  color: #000;
  font-size: 1rem;
  padding: .2rem;
  transform-origin: 0 100%;
  rotate: -4deg;
  font-weight: 600;
  /*box-shadow: 0 .2rem 0 0 #00000033;*/
  /*margin-bottom: -6.2rem;*/
  border: solid #000;
  border-width: 0 0;
  position: absolute;
  /*top: 50%;*/
  translate: 0 -50%;
}
.stripe1:nth-child(1) { bottom: 10px; rotate: -4deg; z-index: 10; opacity: .9; }
.stripe1:nth-child(2) { top: 55%; rotate: 3deg; z-index: 1; opacity: .6; translate: -30px 0; }

@media (max-width: 480px) {
  .formula {
    /*margin-top: 1.5rem;*/
  }
  .formula-wr {
    justify-content: center;
    padding-left: 0;
  }
  .socks-out {
    padding-right: 1.2rem;
  }
  .stripe {
    transform-origin: 100% 100%;
    rotate: 4deg;
  }
}
</style>