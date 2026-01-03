// composables/useCurrencyFormatter.ts
export default () => {
  const { locale } = useI18n()

  const formatPlain = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat(locale.value, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatWithSuperscript = (amount: number, currencyCode: string) => {
    const formatter = new Intl.NumberFormat(locale.value, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: 'symbol'
    })

    const parts = formatter.formatToParts(amount)

    return parts.map(part => {
      switch (part.type) {
        case 'currency':
          return `<span class="currency-symbol">${part.value}</span>`
        case 'integer':
          return `<span class="integer-part">${part.value}</span>`
        case 'group': // разделитель тысяч (запятая, точка)
          return `<span class="group-separator">${part.value}</span>`
        case 'decimal':
          return '' //`<span class="decimal-separator">${part.value}</span>`
        case 'fraction':
          return `<sup class="fraction-part">${part.value}</sup>`
        default:
          return part.value
      }
    }).join('')
  }

  return {
    formatPlain,
    formatWithSuperscript
  }
}