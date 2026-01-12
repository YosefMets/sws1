<script setup>
import NInput from "~/components/controls/NInput.vue";
import NCheck from "~/components/controls/NCheck.vue";
import NButton from "~/components/controls/NButton.vue";
import {useAppStore} from "../../stores/appStore.js";
import NInput1 from "./controls/NInput1.vue";
// import NLink from "~/components/controls/NLink.vue";

const { config, currencyIso, user } = storeToRefs( useAppStore() );
const { shipping } = user.value;
const { price: $ } = config.value;

const agreed = ref(true);
const openPayment = ref(false);
const stripe = ref(null);

const gotoPayment = async () => {
  openPayment.value = true;

  const { data } = await useFetch('/api/customer/create', {
    method: "POST",
    body: user.value,
  });
}

const checkout = async () => {
  const sss = await stripe.value.getToken();
  const { token, error } = sss;

  if (error) {
    alert('Stripe error')
    console.log(error);
    return
  }

  console.log(sss)

  const { id, card } = token;

  user.value.payment = {
    token: id,
    brand: card.brand,
    exp_month: card.exp_month,
    exp_year: card.exp_year,
    last4: card.last4,
  };

  const { data } = await useFetch('/api/customer/subscribe', {
    method: "POST",
    body: {
      customer: user.value.email,
      amount: $,
      currency: currencyIso.value,
      token: id,
    },
  });

  console.log(data);
}
</script>

<template>

  <section class="s-form">

    <aside class="left">
      <div class="cover">
        <img src="/i/delivery.avif" alt="" loading="lazy" />
      </div>
    </aside>

    <aside class="right">
      <div class="container">
        <div>
          <h2>{{ $t('formTitle') }}</h2>

          {{user}}

          <form @submit.prevent="gotoPayment">
            <div class="fields">
              <Sizes class="field" />
              <NInput v-model="user.fname"
                      class="field w50"
                      required
                      autocomplete="given-name"
                      :placeholder="$t('firstName')" />
              <NInput v-model="user.lname"
                      class="field w50"
                      required
                      autocomplete="family-name"
                      :placeholder="$t('lastName')" />
              <NInput v-model="user.email"
                      class="field"
                      required
                      autocomplete="email"
                      type="email"
                      :placeholder="$t('email')" />
            </div>

            <h4>{{ $t('deliveryAddress') }}</h4>
            <div class="fields">
              <NInput v-model="shipping.address"
                      class="field"
                      autocomplete="shipping address-line1"
                      :placeholder="$t('address')" />
              <NInput v-model="shipping.address2"
                      class="field"
                      autocomplete="shipping address-line2"
                      :placeholder="$t('address2') + ' (' + $t('option') + ')'" />
              <NInput v-model="shipping.zip"
                      class="field w40"
                      autocomplete="shipping postal-code"
                      :placeholder="$t('zip')" />
              <NInput1 v-model="shipping.state"
                       class="field w60"
                       :editable="!config.states"
                       :autocomplete="!!config.states ? 'off' : 'shipping address-level1'"
                       :placeholder="$t('state')"
                       :options="config.states" />
              <NInput v-model="shipping.city"
                      class="field"
                      autocomplete="shipping address-level2"
                      :placeholder="$t('city')" />
            </div>

<!--            <div class="fields">-->
<!--              <NCheck v-model="user.news" class="field">{{ $t('newsAgreed') }}</NCheck>-->
<!--            </div>-->
            <div class="fields">
              <NCheck v-model="agreed" class="field" required>{{ $t('agreed') }}
                <NuxtLink :to="'terms'" target="_blank">{{ $t('terms') }}</NuxtLink>,
                <NuxtLink :to="'privacy'" target="_blank">{{ $t('privacy') }}</NuxtLink>,
                <NuxtLink :to="'refund'" target="_blank">{{ $t('refund') }}</NuxtLink>
              </NCheck>
            </div>

            <div class="fields">
              <NButton class="field">{{ $t('checkout') }}</NButton>
            </div>

            <Payments />

<!--            <Modal :show="openPayment"-->
<!--                   :vShow="true"-->
<!--                   :width="'40rem'"-->
<!--                   @close="() => openPayment = false">-->

<!--              <template #header>{{ $t('payment') }}</template>-->

<!--              <Stripe ref="stripe" />-->
<!--              <NButton @click="checkout">{{ $t('checkout') }}</NButton>-->

<!--            </Modal>-->

          </form>
        </div>
      </div>

      <div class="container copy">
        <NuxtLink :to="'terms'" target="_blank">{{ $t('terms') }}</NuxtLink>
        &bull;
        <NuxtLink :to="'privacy'" target="_blank">{{ $t('privacy') }}</NuxtLink>
        &bull;
        <NuxtLink :to="'refund'" target="_blank">{{ $t('refund') }}</NuxtLink>
        <br />
        &copy; Stop Washing Socks. All rights reserved.
      </div>

    </aside>
  </section>
</template>

<style scoped>
.s-form {
  min-height: 100vh;
  background-color: var(--bg);
  z-index: 2000;
}
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
  justify-content: space-between;
}

h2 {
  margin-bottom: 2rem;
}
h4 {
  margin-bottom: 1rem;
}

.fields {
  margin-bottom: 2rem;
}

a {
  color: #000;
  text-decoration: none;
  font-weight: 500;
}

.copy {
  margin: 2rem 0;
}

@media (max-width: 480px) {
  .s-form { min-height: auto; }
  .left,
  section:before {
    height: var(--heads-top);
    width: 100%;
  }
  .left {
    background-position: 50% 76%;
  }
  section > aside:first-of-type {
    height: var(--heads-top);
    justify-content: flex-end;
  }
  section > aside:first-of-type > h2 {
    display: block;
    color: #fff;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }
  section > aside:last-of-type > h2 {
    display: none;
  }

  section > aside:last-of-type {
    /*padding-bottom: 2rem;*/
  }
  .copy {
    text-align: center;
  }
}
</style>
