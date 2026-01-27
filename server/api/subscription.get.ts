import { db, schema } from '@nuxthub/db'
import { eq, gt } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token

  console.log('Token from query:', token)

  const customer = await db.select()
    .from(schema.customers)
    .where(eq(schema.customers.accessToken, token))
    .where(gt(schema.customers.tokenExpires, new Date()))
    .then(res => res[0])

  console.log('Customer found:', customer?.email)

  if (!customer) {
    throw createError({ statusCode: 401, message: 'Invalid or expired token' })
  }

  const subscription = await db.select()
    .from(schema.subscriptions)
    .where(eq(schema.subscriptions.customerId, customer.id))
    .then(res => res[0])

  console.log('Subscription found:', subscription?.status)

  return {
    userEmail: customer.email,
    status: subscription.status,
    currentPeriodEnd: subscription.currentPeriodEnd,
    size: subscription.size
  }
})