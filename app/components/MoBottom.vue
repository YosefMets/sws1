<script setup>
import NButton from "~/components/controls/NButton.vue";
</script>

<template>
<!--  <div class="mo-bottom-container">-->
    <NButton class="mo-bottom">{{ $t('tryNow') }}</NButton>
<!--  </div>-->
</template>

<style scoped>
.mo-bottom-container { display: none; }
.mo-bottom { display: none; }

@media (max-width: 480px) {
  .mo-bottom-container {
    display: flex;
    position: sticky;
    bottom: 0;
  }
  .mo-bottom {
    position: fixed;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
    border-radius: var(--br);
    width: calc(100% - 4rem);
    /*height: 10rem;*/
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /*border-width: 0.4rem;*/
    /*box-shadow: 0 0 0 1rem #ffffff66;*/
    z-index: 1000;
  }
  .mo-bottom > svg {
    display: none;
    stroke-width: .3rem;
    stroke: #fff;
    margin-top: 1rem;
    margin-bottom: -0.8rem;
  }
}
</style>