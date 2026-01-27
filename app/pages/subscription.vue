<!-- pages/subscription.vue -->
<script setup>
import SvgX from "../components/imgs/svg-x.vue";

const route = useRoute()
const loading = ref(true)
const error = ref('')
const subscription = ref(null)
const canceling = ref(false)

// 1. Проверить токен и получить данные подписки
onMounted(async () => {
  const token = route.query.token
  console.log( token );
  if (!token) {
    error.value = 'Invalid access token'
    loading.value = false
    return
  }

  try {
    const data = await $fetch(`/api/subscription?token=${token}`)
    console.log( data );
    subscription.value = data
  } catch (err) {
    error.value = err.data?.message || 'Failed to load subscription'
  } finally {
    loading.value = false
  }
})

// 2. Форматирование даты
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 3. Отмена подписки
const cancelSubscription = async () => {
  if (!confirm('Are you sure?')) return

  canceling.value = true
  try {
    await $fetch('/api/cancel-subscription', {
      method: 'POST',
      body: { token: route.query.token }
    })
    subscription.value.status = 'canceled'
    alert('Subscription canceled')
  } catch (err) {
    alert(err.data?.message || 'Cancel failed')
  } finally {
    canceling.value = false
  }
}
</script>

<template>

  <section>

    <aside class="left">
      <div class="container">
        <h2>{{ $t('hi') }} first_name, {{ $t('thanks4YourChose') }}</h2>
        <div class="widget-list">
          <div class="widget-list-header">
            <h3 class="widget-list-title">{{ $t('shippingAddress') }}</h3>
            <div class="widget-list-add">
              <svg-x class="widget-list-x" />
            </div>
          </div>
          <ul class="widget-list-list">
            <li class="widget-list-item">
              shipping address can only be changed
              payment method can be added, deleted, but at least one has to be
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <aside class="right">
      <div class="container">
        qwe
      </div>
    </aside>

  </section>

  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h2>Subscription for {{ subscription.userEmail }}</h2>
    <p>Status: {{ subscription.status }}</p>
    <p v-if="subscription.currentPeriodEnd">
      Next payment: {{ formatDate(subscription.currentPeriodEnd) }}
    </p>
    <p v-else>
      First payment pending
    </p>
    <p>Size: {{ subscription.size }}</p>
    <button @click="cancelSubscription" :disabled="canceling">
      {{ canceling ? 'Canceling...' : 'Cancel subscription' }}
    </button>
  </div>
</template>

<style scoped>
.widget-list {
  background-color: #fff;
  border-radius: var(--br) 24px var(--br) var(--br);
  padding: 10px;
}
.widget-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.widget-list-title {
  margin: 0;
  font-size: 16px;
}
.widget-list-add {
  border-radius: 50%;
  background-color: #eee;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.widget-list-x {
  rotate: 45deg;
  stroke-width: .2rem;
  width: 1.2rem;
  height: 1.2rem;
}
.widget-list-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.widget-list-item {
  padding: 5px;
}
</style>
