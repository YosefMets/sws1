<template>
  <div class="lg">Stop<br>washing<br>socks</div>
</template>

<style scoped>
.lg {
  display: inline-block;
  background-color: #c00;
  border-radius: .3em;
  color: #fff;
  /*font: 900 normal 3rem/1.2em 'Poppins', sans-serif;*/
  font: 900 normal 3rem/1.2em 'Montserrat', sans-serif;
  margin: 0;
  padding: .35em .6em;
  text-transform: uppercase;
  text-align: center;
  transform-origin: 100% 50%;
  transform: rotate(-7.5deg);
  cursor: default;
  user-select: none;
}
@media (max-width: 480px) {
  .lg {
    font-size: 1.4rem;
    transform-origin: 50% 50%;
  }
}
@media (max-width: 350px) {
  .lg {
    font-size: 1.4rem;
  }
}
</style>
