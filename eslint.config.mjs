import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: (await import('vue-eslint-parser')).default,
      parserOptions: {
        parser: await import('@typescript-eslint/parser'),
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        defineNuxtConfig: 'readonly',
        definePageMeta: 'readonly',
        useRoute: 'readonly',
        useState: 'readonly'
      }
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: eslintPluginPrettier
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'error',
      'prettier/prettier': 'error',
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  }
]

