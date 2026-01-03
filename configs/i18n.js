export default {
  locales: [
    { code: 'en', iso: 'en-US', file: 'en.json' },
    { code: 'ru', iso: 'ru-RU', file: 'ru.json' }
  ],
  defaultLocale: 'en',
  strategy: 'prefix',
  lazy: true,
  langDir: 'locales',
  vueI18n: './configs/i18n.config.ts',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  }
}