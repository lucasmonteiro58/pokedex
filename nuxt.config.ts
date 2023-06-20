// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },
  eslint: {
    lintOnStart: false,
  },
});
