import path from 'path'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  $production: {
    runtimeConfig: {
      public: {
        api: 'https://chat.115.studio/api/v1',
      },
    },
    nitro: {
      preset: 'cloudflare-pages-static',
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        api: 'http://localhost:8787',
      },
    },
  },
  ssr: false,
  components: [
    {
      path: '@app/components',
      pathPrefix: false,
    },
  ],
  imports: {
    scan: false,
  },
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'transition-page', mode: 'out-in' },
  },
  css: ['@app/assets/styles/global.scss'],
  alias: {
    '@app': path.resolve(__dirname, 'app'),
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-06-09',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  fonts: {
    defaults: {
      weights: [400, 500, 700],
      subsets: ['cyrillic-ext', 'cyrillic', 'latin-ext', 'latin'],
    },
    experimental: {
      processCSSVariables: true,
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
})
