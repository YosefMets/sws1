import { getRequestHeader, getRequestURL, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') return

  const path = getRequestURL(event).pathname
  if (path.startsWith('/api/') || path.startsWith('/_')) return

  // Проверяем, есть ли уже кука
  const cookieHeader = getRequestHeader(event, 'cookie') || ''
  const cookies = parseCookies(cookieHeader)
  if (cookies['geo-country']) return

  // Определяем страну
  let country = 'us'
  try {
    const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0] || '8.8.8.8'
    const geo = await $fetch(`http://ip-api.com/json/${ip}?fields=status,countryCode`)
    if (geo?.status === 'success') country = geo.countryCode.toLowerCase()
  } catch {
    // оставляем 'us'
  }

  // Ставим куку
  setCookie(event, 'geo-country', country, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 604800,
    path: '/'
  })
})

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {}
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) cookies[name] = decodeURIComponent(value)
  })
  return cookies
}
