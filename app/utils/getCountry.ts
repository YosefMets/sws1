import { getRequestHeader } from 'h3'

export default function (): string {
  // Сервер
  if (process.server) {
    const event = useRequestEvent()
    if (event) {
      const cookieHeader = getRequestHeader(event, 'cookie') || ''
      const cookies = parseCookies(cookieHeader)
      return cookies['geo-country'] || 'us'
    }
  }

  // Клиент
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`
    const parts = value.split('; geo-country=')
    if (parts.length === 2) return parts.pop()?.split(';').shift() || 'us'
  }

  return 'us'
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {}
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) cookies[name] = decodeURIComponent(value)
  })
  return cookies
}