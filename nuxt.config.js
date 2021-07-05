import {deepMerge} from 'avril/js/utils/object.js';
import sharedConfig from 'avril/js/nuxt.config.js';

export default deepMerge(sharedConfig, {
  css: [
    '~/assets/app.scss',
    'swiper/dist/css/swiper.css'
  ],
  head: {
    title: 'Mon dossier de recevabilité Avril - la VAE facile',
  },
  loading: false,
  plugins: [
    { src: '~/plugins/expandable-image', mode: 'client' },
    '~/plugins/filters',
  ],
  router: {
    base: process.env.NUXT_BOOKLET_PATH,
    middleware: [
      'autosave',
      'store-current-path',
    ]
  },
  markdownit: {},
  sentry: {
    dsn: process.env.NUXT_BOOKLET_SENTRY_DSN,
  }
})
