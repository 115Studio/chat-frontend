import path from 'path'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      discordOauth2Url: 'https://discord.com/oauth2/authorize?client_id=$CLIENT_ID&redirect_uri=$REDIRECT&response_type=code&scope=identify+email'
    }
  },
  $production: {
    runtimeConfig: {
      public: {
        discordClientId: '1381420687230763129',
        api: 'https://chat.115.studio/api/v1',
        ws: 'wss://chat.115.studio/api/v1/sync/connection',
      },
    },
    nitro: {
      preset: 'cloudflare-pages-static',
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        discordClientId: '1381420687230763129',
        api: 'https://cf-test.rinisle.uk/api/v1',
        ws: 'ws://localhost:8787/api/v1/sync/connection',
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
    layoutTransition: { name: 'transition-page', mode: 'out-in' },
  },
  css: ['@app/assets/styles/global.scss'],
  alias: {
    '@app': path.resolve(__dirname, 'app'),
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-06-09',
  vite: {
    server: {
      allowedHosts: ['localhost', 'test2.rinisle.uk'],
    },
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
