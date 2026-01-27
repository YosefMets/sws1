// server/api/stripe-webhook.post.js
import { useServerStripe } from '#stripe/server'
import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const body = await readRawBody(event)
  const signature = getHeader(event, 'stripe-signature')

  try {
    // 1. Верификация webhook
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const stripeEvent = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // 2. Обработка событий
    switch (stripeEvent.type) {
      case 'invoice.paid':
        const invoice = stripeEvent.data.object
        await db.update(schema.subscriptions)
          .set({
            status: 'active',
            currentPeriodEnd: new Date(invoice.lines.data[0].period.end * 1000)
          })
          .where(eq(schema.subscriptions.stripeSubscriptionId, invoice.subscription))
        break

      case 'invoice.payment_failed':
        const failedInvoice = stripeEvent.data.object
        await db.update(schema.subscriptions)
          .set({ status: 'past_due' })
          .where(eq(schema.subscriptions.stripeSubscriptionId, failedInvoice.subscription))
        break

      case 'customer.subscription.deleted':
        const subscription = stripeEvent.data.object
        await db.update(schema.subscriptions)
          .set({ status: 'canceled' })
          .where(eq(schema.subscriptions.stripeSubscriptionId, subscription.id))
        break
    }

    return { received: true }
  } catch (error) {
    console.error('Webhook error:', error)
    throw createError({ statusCode: 400, message: 'Webhook verification failed' })
  }
})