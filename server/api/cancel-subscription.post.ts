// server/api/cancel-subscription.post.js
import { useServerStripe } from '#stripe/server'
import { db, schema } from '@nuxthub/db'
import { eq, gt } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const { token } = await readBody(event)

  // 1. Найти customer по токену
  const customer = await db.select()
    .from(schema.customers)
    .where(eq(schema.customers.accessToken, token))
    .where(gt(schema.customers.tokenExpires, new Date()))
    .then(res => res[0])

  if (!customer) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  // 2. Найти активную подписку
  const subscription = await db.select()
    .from(schema.subscriptions)
    .where(eq(schema.subscriptions.customerId, customer.id))
    .where(eq(schema.subscriptions.status, 'active'))
    .then(res => res[0])

  if (!subscription) {
    throw createError({ statusCode: 404, message: 'No active subscription' })
  }

  // 3. Отменить в Stripe
  await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
    cancel_at_period_end: true
  })
  // stripe.subscriptions.del(subscriptionId)

  // 4. Обновить статус в БД
  await db.update(schema.subscriptions)
    .set({ status: 'canceled' })
    .where(eq(schema.subscriptions.id, subscription.id))

  return { canceled: true }
})