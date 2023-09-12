// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
  modules: [
    // '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/supabase',
    'floating-vue/nuxt',
    'nuxt-icons',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt' // @vueuse/nuxt an add-on of VueUse, which provides better Nuxt integration auto-import capabilities.
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
  googleFonts: {
    families: {
      // a name with spaces
      Roboto: true,
      'Source Sans 3': [100,200,300,350,400,500,600,700],
      'Source Serif 4': [100,200,300,350,400,500,600,700],
      Raleway: [100,200,300,350,400,500,600,700],
      // specific font weights
      // Lato: [100, 300],
    }
  },
  css: [
    // CSS file in the project
    '@/assets/css/main.css',
    // SCSS file in the project
    '@/assets/css/main.scss'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" 
        },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@100;400&display=swap'
        // }
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

