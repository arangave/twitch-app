import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
  ],
  app: {
    head: {
      script: [
        {
          src: 'https://player.twitch.tv/js/embed/v1.js',
          async: true,
        },
      ],
    },
  },
  vite: {
    plugins: [tsconfigPaths({ ignoreConfigErrors: true })],
    define: { 'process.env.DEBUG': false },
  },
})
