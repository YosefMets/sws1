// server/api/subscribe.post.js
import { useServerStripe } from '#stripe/server'
import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const stripe = await useServerStripe(event)
    const body = await readBody(event)

    // Валидация обязательных полей
    const required = ['email', 'firstName', 'lastName', 'paymentMethodId', 'priceId', 'size']
    for (const field of required) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          message: `Missing required field: ${field}`
        })
      }
    }

    // Валидация адреса (state необязателен)
    const address = body.address
    const addressRequired = ['address', 'city', 'zip']
    for (const field of addressRequired) {
      if (!address?.[field]) {
        throw createError({
          statusCode: 400,
          message: `Shipping address is incomplete: missing ${field}`
        })
      }
    }

    // 1. Поиск или создание Customer в Stripe
    const existingCustomers = await stripe.customers.list({
      email: body.email,
      limit: 1
    })

    let stripeCustomer
    if (existingCustomers.data.length > 0) {
      stripeCustomer = existingCustomers.data[0]
      // Привязать новую карту к существующему customer
      await stripe.paymentMethods.attach(body.paymentMethodId, {
        customer: stripeCustomer.id
      })
      // Обновить карту по умолчанию
      await stripe.customers.update(stripeCustomer.id, {
        invoice_settings: {
          default_payment_method: body.paymentMethodId
        }
      })
    } else {
      stripeCustomer = await stripe.customers.create({
        email: body.email,
        name: `${body.firstName} ${body.lastName}`,
        address: {
          line1: address.address,
          line2: address.address2 || '',
          postal_code: address.zip,
          state: address.state || '',
          city: address.city
        }
      })
      // Привязать карту к новому customer
      await stripe.paymentMethods.attach(body.paymentMethodId, {
        customer: stripeCustomer.id
      })
      // Установить карту по умолчанию
      await stripe.customers.update(stripeCustomer.id, {
        invoice_settings: {
          default_payment_method: body.paymentMethodId
        }
      })
    }

    // 2. Создать подписку в Stripe
    const stripeSubscription = await stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ price: body.priceId }],
      expand: ['latest_invoice.payment_intent']
    })

    // 3. Сохранить/обновить Customer в нашей БД
    let customer = await db.select()
      .from(schema.customers)
      .where(eq(schema.customers.email, body.email))
      .then(res => res[0])

    if (!customer) {
      [customer] = await db.insert(schema.customers)
        .values({
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          stripeCustomerId: stripeCustomer.id
        })
        .returning()
    } else if (!customer.stripeCustomerId) {
      // Если customer есть в БД, но нет stripeCustomerId - обновить
      await db.update(schema.customers)
        .set({ stripeCustomerId: stripeCustomer.id })
        .where(eq(schema.customers.id, customer.id))
    }

    // 4. Сохранить Subscription в нашу БД
    const [subscription] = await db.insert(schema.subscriptions)
      .values({
        customerId: customer.id,
        stripeSubscriptionId: stripeSubscription.id,
        status: stripeSubscription.status,
        priceId: body.priceId,
        size: body.size,
        currentPeriodEnd: stripeSubscription.current_period_end
          ? new Date(stripeSubscription.current_period_end * 1000)
          : null,
        shippingLine1: address.address,
        shippingLine2: address.address2 || '',
        shippingCity: address.city,
        shippingState: address.state || '',
        shippingZip: address.zip
      })
      .returning()

    return {
      success: true,
      stripe: {
        customerId: stripeCustomer.id,
        subscriptionId: stripeSubscription.id,
        clientSecret: stripeSubscription.latest_invoice?.payment_intent?.client_secret
      },
      db: {
        customerId: customer.id,
        subscriptionId: subscription.id
      }
    }

  } catch (error) {
    // Stripe ошибки (пользовательские)
    if (error.type?.includes('Stripe') || error.raw?.type?.includes('card')) {
      throw createError({
        statusCode: 400,
        message: error.message || 'Payment failed. Check your card details.'
      })
    }

    // Валидационные ошибки
    if (error.statusCode === 400) {
      throw error
    }

    // Системные ошибки
    console.error('Subscription error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Internal server error. Please try again later.'
    })
  }
})