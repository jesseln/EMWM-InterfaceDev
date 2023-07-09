// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/supabase'
  ],
  image: {
    presets: {
      bookImage: {
        modifiers: {
          format: 'jpg',
          width: 200,
          height: 200
        }
      }
    }
  },
  // css: [
  //   // CSS file in the project
  //   '@/assets/css/main.css',
  //   // SCSS file in the project
  //   '@/assets/css/main.scss'
  // ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" 
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@100;400&display=swap'
        }
      ] 
    }
  },
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  }
  // runtimeConfig: {
  //   // The private keys which are only available within server-side
  //     supabaseKey: process.env.SUPABASE_KEY,
  //   // Keys within public, will be also exposed to the client-side
  //   public: {
  //     supabaseUrl: process.env.SUPABASE_URL,
  //   }
  // }
})

