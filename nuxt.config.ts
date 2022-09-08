import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['@/assets/main.css'],
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/vote', '/thankyou']
    }
  }
})
