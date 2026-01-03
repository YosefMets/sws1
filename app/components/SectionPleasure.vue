<script setup>

</script>

<template>
  <section>

    <aside>
      <div class="container">
        <h2>Imagine using new socks every day</h2>
      </div>
    </aside>

    <div class="ill-wr">
      <img src="/i/pleasure.avif" alt="" class="ill" />
    </div>

  </section>
</template>

<style scoped>
section {
}
section:after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #00000040;
}
aside {
  padding-top: 3rem;
  padding-left: 2rem;
  justify-content: center;
  /*align-self: start;*/
  position: relative;
  z-index: 1;
}
h2 {
  color: #fff;
  text-shadow: 0 0 5rem #000;
  font-size: 4rem;
}

.ill-wr {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.ill {
  object-fit: cover;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
}


@media (max-width: 480px) {
  section > aside {
    padding: 0;
  }
}


</style>
