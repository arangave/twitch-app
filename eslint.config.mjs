import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginPrettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: await import("@typescript-eslint/parser"),
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": "error",
      "prettier/prettier": "error",
      semi: ["error", "never"],
      quotes: ["error", "single"],
    },
  },
];
