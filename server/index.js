import get from 'lodash.get'
import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import pdfGenerator from './pdf'

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.get('/healthcheck', (req, res) => {
  res.send(200)
})

app.post(
  `${get(config, 'router.base')}/cerfa.pdf`,
  express.urlencoded({ extended: true, limit: '1mb', }),
  pdfGenerator
);

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()