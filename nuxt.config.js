
module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
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
  buildDir: process.env.NUXT_BUILD_DIR,
  css: [
    '~/assets/app.scss',
    'swiper/dist/css/swiper.css'
  ],
  env: {
    clientToPhoenixUrl: process.env.CLIENT_TO_PHOENIX_URL,
    serverToPhoenixUrl: process.env.SERVER_TO_PHOENIX_URL,
    hotjarId: process.env.NUXT_HOTJAR_ID,
    crispWebsiteId: process.env.NUXT_CRISP_WEBSITE_ID,
    serverAuthKey: process.env.SECRET_KEY_BASE,
    algoliaCredentials: {
      id: process.env.NUXT_ALGOLIA_PLACES_APP_ID,
      key: process.env.NUXT_ALGOLIA_PLACES_API_KEY
    },
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
  loading: false,
  mode: 'universal',
  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/markdownit',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sentry',
    'cookie-universal-nuxt',
  ],
  plugins: [
    '~/plugins/filters.js',
    { src: '~/plugins/datepicker', mode: 'client' },
    // '~/plugins/phoenixUrl.js',
    '~/plugins/hotjar.js',
    { src: '~/plugins/expandable-image', mode: 'client' },
    // '~/plugins/crisp.js',
  ],
  router: {
    base: process.env.NUXT_BOOKLET_PATH,
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
    ].filter(v => v),
    dev: false,
  },
  sentry: {
    dsn: process.env.NUXT_BOOKLET_SENTRY_DSN,
    config: {
      environment: process.env.NODE_ENV,
      release: process.env.HEROKU_SLUG_COMMIT,
    },
  }
}
