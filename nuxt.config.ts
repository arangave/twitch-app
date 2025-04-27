// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineNuxtConfig({
  css: [
    '~/assets/styles/resets.css', // tu reset CSS global
    '~/assets/styles/main.scss', // tu SCSS principal
  ],

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
          additionalData: `
            @use "~/assets/styles/_variables.scss" as *;
            @use "~/assets/styles/_mixins.scss" as *;
          `,
        },
      },
    },
  },

  compatibilityDate: '2025-04-23',
})
