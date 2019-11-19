
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
  buildModules: ['@nuxtjs/moment'],
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
  ],
  moment: {
    defaultLocale: 'fr',
    locales: ['fr']
  },
  plugins: [
    '~/plugins/filters.js',
  ],
  router: {
    middleware: [
      'autosave',
      'store-current-path',
    ]
  },
  markdownit: {
  },
}
