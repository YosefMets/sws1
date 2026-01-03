
export default function (country: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `geo-country=${country}; path=/; max-age=604800${process.env.NODE_ENV === 'production' ? '; secure' : ''}`
}