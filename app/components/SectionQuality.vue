<template>
  <section>
    <div>
      <aside>
        <h1>You dress<br>new socks<br>every day</h1>
      </aside>
      <aside>
        <div class="socks">
          <ul>
            <li><h3 class="elastic">Soft elastic</h3></li>
            <li><h3 class="cotton">80% Cotton<i>20% Elastan</i></h3></li>
            <li><h3 class="heel">Intensified heel</h3></li>
            <li><h3 class="seasons">Four seasons<br>❄️🌼☀️☔️</h3></li>
            <li><h3 class="seam">Soft seam</h3></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
section {
  height: auto;
  overflow-x: hidden;
}

section:before {
  background-image:
    url('https://images.unsplash.com/photo-1504198146285-9aba0ff6292d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80');
  background-position: 100% 100%;
}
section:after {
  width: 247px;
  height: 456px;
  background-image: url('/imgs/cotton-flower.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: -210px;
  /*background-color: antiquewhite;*/
  transform: rotate(-37.5deg);
}
section > div > aside:first-child {
  justify-content: flex-start;
  padding-top: 3rem;
}
section > div > aside:last-child {
  padding-left:  0;
  margin-left: -20rem;
}

.socks {
  position: relative;
  width: 100%;
  height: 49rem;
  background-image: url('https://www.blacksocks.com/files/MS-schwarz.png');
  background-repeat: no-repeat;
  background-size: 39rem;
  background-position-x: -1.3rem;
  padding-left: 30rem;
}

.socks > ul  {
  list-style: none;
  margin: 0;
  padding: 0 0 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.socks h3 {
  font-weight: 700;
  position: relative;
}
.socks h3 > i {
  font-style: normal;
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
}
.socks h3:after {
  content: '';
  display: block;
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 1rem;
  width: 20rem;
  height: .05rem;
  background-color: #fff;
}
.socks h3.elastic:after {width: 10rem;}
.socks h3.cotton:after {width: 12rem;}
.socks h3.heel:after {width: 4rem;}
.socks h3.seasons:after {content: none;}
.socks h3.seam:after {width: 24rem;}

@media (max-width: 480px) {
  main {
  }
}
</style>
