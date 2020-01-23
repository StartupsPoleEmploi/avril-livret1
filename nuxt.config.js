
module.exports = {
  server: {
    port: process.env.NUXT_PORT || process.env.PORT || 3000,
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
  css: [
    '~/assets/app.scss',
    'swiper/dist/css/swiper.css'
  ],
  env: {
    phoenixUrl: process.env.PHOENIX_URL,
    apiUrl: process.env.API_URL,
    hotjarId: process.env.NUXT_HOTJAR_ID,
    crispWebsiteId: process.env.NUXT_CRISP_WEBSITE_ID,
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
    { src: '~/plugins/datepicker', ssr: false },
    '~/plugins/phoenixUrl.js',
    '~/plugins/hotjar.js',
    // '~/plugins/crisp.js',
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
    ].filter(v => v),
    dev: false,
    // debug: {
    //   enabled: true,
    //   sendHitTask: true
    // },
    fields: {
      allowLinker: !!process.env.PHOENIX_URL,
    },
    beforeFirstHit: (params) => {
      if (window.phoenixUrl) {
        window.ga('require', 'linker');
        window.ga('linker:autoLink', [window.phoenixUrl.replace(/^https?:\/\//i, '')] );
      }
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {
      environment: process.env.NODE_ENV,
      release: process.env.HEROKU_SLUG_COMMIT,
    },
  }
}
