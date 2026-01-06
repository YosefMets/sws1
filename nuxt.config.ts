import i18n from './configs/i18n'
// import { i18n } from './configs/i18n'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxtjs/i18n',
    '@unlok-co/nuxt-stripe',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/device'
  ],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/deucrhprn/image/upload/'
    }
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales',
    // vueI18n: './configs/i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },

  css: [
    'assets/css/font.css',
    'assets/css/common.css',
  ],

  runtimeConfig: {
    stripe: {
      key: process.env.STRIPE_SECRET_KEY,
    },
    public: {
      stripe: {
        key: process.env.STRIPE_PUBLIC_KEY,
      },
    },
  },

  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },

  // Оптимизация шрифтов
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true
    }
  },

  // Для Vite хеширования
  vite: {
    assetsInclude: ['**/*.woff2']
  }
  /*
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true
    }
  },
  **/
})