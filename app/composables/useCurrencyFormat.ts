// composables/useCurrencyFormat.ts
export const useCurrencyFormat = () => {
  const { locale } = useI18n()

  const format = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat(locale.value, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

  return { format }
}