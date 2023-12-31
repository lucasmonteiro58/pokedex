// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
    "unplugin-fonts/nuxt",
  ],
  app: {
    head: {
      title: "Pokédex",
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },
  eslint: {
    lintOnStart: false,
  },
  unfonts: {
    google: {
      families: [
        {
          name: "Poppins",
          styles: "wght@400;500;600;700;800;900",
        },
      ],
    },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
});
