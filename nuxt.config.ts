// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineNuxtConfig({
  css: ['~/assets/styles/resets.css'],

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
          additionalData: '@use "~/assets/styles/main.scss";',
        },
      },
    },
  },

  compatibilityDate: '2025-04-23',
})
