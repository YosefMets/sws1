import { i18n } from './configs/i18n'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@unlok-co/nuxt-stripe'
  ],
  i18n,

  css: [
    'assets/css/fonts.css',
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
  /*
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true
    }
  },
  **/
})