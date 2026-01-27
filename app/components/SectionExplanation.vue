<script setup>

</script>

<template>
  <section>

    <aside>
      <div class="container">
        <h2>You get this box each month</h2>
        <p>The socks contain 70% cotton, are soft and seamless.</p>
        <p>What's inside:</p>
        <ul>
          <li>31 pairs of socks (black for a while)</li>
          <li>2 recyclable packets for socks for recycle, if you are caring about the Earth. We do, and recommend to do it for everyone.</li>
        </ul>
      </div>
    </aside>

    <aside>
      <div class="container">

      </div>
    </aside>

    <div class="ill-wr">
      <NuxtImg provider="cloudinary"
               src="sws-box"
               alt=""
               class="box"
               :modifiers="{ c: 'fill' }"
      />
    </div>

  </section>
</template>

<style scoped>
section {
  height: 100vh;
  overflow: hidden;
  background-color: #222;
}
aside {
  padding-top: 3rem;
  padding-left: 2rem;
  justify-content: center;
  /*align-self: start;*/
  position: relative;
  z-index: 1;
}
.container {
  height: 100%;
}
h2 {
  color: #fff;
  text-shadow: 0 0 5rem #000;
  font-size: 4rem;
}

.box-wr {
  width: 100%;
  height: 100%;
}
.box {
  object-fit: contain;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
}

.ill-wr {
  position: absolute;
  left: 50%;
  top: -10rem;
  bottom: 5rem;
  translate: -50% 0;
  /*margin-left: 10rem;*/
  width: var(--container-width);
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
