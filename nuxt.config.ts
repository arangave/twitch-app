// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineNuxtConfig({
  // 1) inyecta tu CSS global sólo una vez
  css: ['~/assets/styles/main.scss'],

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
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: [resolve(__dirname, 'assets/styles')],
        },
      },
    },
  },

  compatibilityDate: '2025-04-23',
})
