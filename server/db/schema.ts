// server/db/schema.ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const customers = pgTable('customers', {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  firstName: text(),
  lastName: text(),
  stripeCustomerId: text().unique(),
  accessToken: text(),
  tokenExpires: timestamp(),
  createdAt: timestamp().defaultNow()
})

export const subscriptions = pgTable('subscriptions', {
  id: uuid().primaryKey().defaultRandom(),
  customerId: uuid().references(() => customers.id),
  stripeSubscriptionId: text().notNull().unique(),
  status: text().notNull(),
  priceId: text().notNull(),
  size: text().notNull(), // 'S', 'M', 'L', etc.
  currentPeriodEnd: timestamp(),
  shippingLine1: text(),
  shippingLine2: text(),
  shippingCity: text(),
  shippingState: text(),
  shippingZip: text(),
  createdAt: timestamp().defaultNow()
})