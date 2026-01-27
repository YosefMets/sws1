// server/api/subscription-access.post.js
import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm'
import { createTransport } from 'nodemailer'
import { randomBytes } from 'node:crypto'


export default defineEventHandler(async (event) => {
  const { email, locale } = await readBody(event)

  // 1. Проверить, есть ли подписка у email
  const customer = await db.select()
    .from(schema.customers)
    .where(eq(schema.customers.email, email))
    .then(res => res[0])

  if (!customer) {
    throw createError({ statusCode: 404, message: 'No subscription found' })
  }

  // 2. Сгенерировать токен
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

  // 3. Сохранить токен в БД (добавить поле tokenExpires в customers)
  await db.update(schema.customers)
    .set({ accessToken: token, tokenExpires: expires })
    .where(eq(schema.customers.id, customer.id))

  // 4. Отправить email
  const url = `http://localhost:5000/${locale}/subscription?token=${token}`
  return { url }

  const transporter = createTransport({ /* настройки SMTP */ })

  await transporter.sendMail({
    to: email,
    subject: 'Manage your subscription',
    html: `<a href="${url}">Click here to manage your subscription</a>`
  })

  return { sent: true, url }
})