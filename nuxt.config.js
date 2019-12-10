
module.exports = {
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend (config, ctx) {}
  },
  css: [
    '~/assets/app.scss',
    'swiper/dist/css/swiper.css'
  ],
  env: {
    nuxtUrl: process.env.NUXT_URL || 'http://localhost:3000',
    phoenixUrl: process.env.PHOENIX_URL,
    apiUrl: process.env.API_URL,
  },
  head: {
    title: 'Livret 1 by Avril, la VAE facile',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap|Material+Icons'
      }
    ]
  },
  loading: '~/components/Loading.vue',
  mode: 'universal',
  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/markdownit',
    '@nuxtjs/google-analytics',
  ],
  plugins: [
    '~/plugins/filters.js',
    { src: '~/plugins/datepicker', ssr: false }
  ],
  router: {
    middleware: [
      'autosave',
      'store-current-path',
    ]
  },
  markdownit: {
  },
  googleAnalytics: {
    id: [
      process.env.GA_API_KEY,
      process.env.GA_PE_API_KEY,
    ],
    dev: false,
  }
}
