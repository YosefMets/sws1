<script setup>
import {useAppStore} from "../../stores/appStore.js";
import SvgSock from "./imgs/svg-sock.vue";
import NButton from "./controls/NButton.vue";

const { t } = useI18n();
const { config, countryIso } = storeToRefs( useAppStore() );
const { price: $, oldPrice: old$ } = config.value;

const { isMobile } = useDevice()

// console.log( config.value )

const ctaStart = computed( () => t('ctaStart')
    .replace(/\+br\+/g, '<br>')
    .replace('+b+', '<b>')
    .replace('-b-', '</b>') );

const ctaEnd = computed( () => t('ctaEnd')
    .replace(/\+br\+/g, '<br>')
    .replace('+b+', '<b>')
    .replace('-b-', '</b>') );

const toHTMLTags = ( str ) => {
  return str.replace(/\[\[/g, '<').replace(/\]\]/g, '>')
}
</script>

<template>

  <section class="s-cta">

    <aside class="left">
      <div class="cover">
        <NuxtImg v-if="!isMobile"
                 provider="cloudinary"
                 src="sws-laundry"
                 alt="" />
      </div>
    </aside>

    <aside class="right">
      <div class="cta-wr">

        <Formula1 class="cta-formula" />

        <div class="container">
          <h1 class="cta">
            <!--
            <i18n-t keypath="cta" tag="p">
              <template #price>
                <strong>{{ format( 19, 'USD' ) }}</strong>
              </template>
            </i18n-t>
            -->

  <!--          <div v-html="toHTMLTags($t('cta', { price: format(19,'USD') }))"></div>-->
            <span v-html="ctaStart" />&nbsp;<Price :amount="$" :formatted="true" /> <span v-html="ctaEnd" />
<!--            <span v-html="toHTMLTags( $t('cta1') )" />-->
<!--            <div class="price-label">-->
<!--              <Price :amount="$" :formatted="true" class="price-in-label" />-->
<!--              <div>{{ $t('perMonth') }}</div>-->
<!--            </div>-->
          </h1>

          <div class="cta-features-wr">
            <div class="cta-features">
              <span class="cta-feature">{{ $t('freeShipping') }}</span>
              &bull;
              <span class="cta-feature">{{ $t('cancelAnytime') }}</span>
            </div>
            <ul class="cta-actions">
              <li><NButton class="go">{{ $t('tryNow') }}</NButton></li>
              <li><NButton :style="'style1'">{{ $t('learnMore') }}</NButton></li>
            </ul>
          </div>

        </div>


      </div>
    </aside>

  </section>

</template>

<style>
.cta b {
  font-weight: 600;
}
</style>

<style scoped>
.s-cta { min-height: 100vh; }
.left:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #88888888;
}
.cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.cover > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.right {
  justify-content: center;
}

.cta-wr {
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  height: 100%;
}

.cta-formula {
  align-self: center;
}

.cta {
  text-wrap: balance;
  font-size: 3.2rem;
  /*margin-top: .8em;*/
  font-weight: 700;
  position: relative;
}
.price-label {
  position: absolute;
  right: 0;
  bottom: 0;
  translate: 0 50%;
  width: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #fff;
  /*rotate: 15deg;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1.8em;
}
.price-in-label {
  font-size: 3rem;
}
.old-price {
  color: #fff;
}
.old-price:after {
  content: '';
  width: 100%;
  height: 10%;
  background-color: #f00;
  position: absolute;
  left: 0;
  top: 50%;
  translate: 0 -50%;
}

/*h4 {*/
/*  margin-top: .8em;*/
/*}*/
.cta > b {
  font-weight: 800;
}
.cta > b > i {
  font-style: normal;
  font-size: 2rem;
  line-height: initial;
  font-weight: 600;
}
.cta > u {
  position: relative;
  color: #fff;
  font-weight: 800;
  text-decoration: none;
}
.cta > u:before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: .3rem;
  width: 110%;
  height: .4rem;
  background-color: #f00;
}
/*.cta > span {*/
/*  font-size: 40%;*/
/*  vertical-align: text-top;*/
/*}*/

.cta-features {
  display: flex;
  gap: .4em;
  font-weight: 600;
  margin-top: 2rem;
}
.cta-feature {

}
.cta-flag {
  width: 1.2rem;
  /*border-radius: 50%;*/
  vertical-align: center;
  display: none;
}


.cta-actions {
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  grid-gap: 1rem;
}
/*.actions > li {*/
/*  margin-right: 1rem;*/
/*}*/
/*.actions > li:last-child {*/
/*  margin-right: 0;*/
/*}*/

.cta-actions .go {
  min-width: 10rem;
}

main {
}

svg.s {
  width: 2rem;
}
@media (max-width: 480px) {
  .right {
    margin-top: 5.8rem;
  }
  .s-cta {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    /*padding: 0 0 10rem;*/
  }
  .cta-wr { margin-top: -4.5rem; }
  .cta-formula {
    align-self: flex-start;
  }
  .cta-features-wr {
    /*align-self: flex-end;*/
    /*align-self: center;*/
  }

  .left,
  section:before {
    /*height: var(--main-top);*/
    height: 0;
    width: 100%;
  }

  .cta {
    /*text-align: center;*/
    font-size: 2.8rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  h4 {
    text-align: center;
  }

  .cta-features {
    padding-left: 1rem;
    padding-right: 1rem;
    /*flex-direction: column;*/
  }

  .cta-actions { display: none; }
}

@media (max-width: 350px) {
  /*section {padding-top: 6rem;}*/

  /*.left,*/
  /*section:before {height: 6rem;}*/

  .formula {margin-top: 2rem;}
}
</style>
