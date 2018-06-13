const i18n = require('./i18n')

module.exports = {
  render: {
    resourceHints: false
  },
  modules: [
    ['nuxt-i18n', i18n],
    '@nuxtjs/axios'
  ],
  plugins: [
    '~/plugins/i18n'
  ],
  router: {
    middleware: 'i18n'
  },
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    /* sc => Side-Car ... What's useful to Nuxt, but would be an useless API by itself. */
    '/sc/translations': {
      target: 'https://cdn.rawgit.com/',
      pathRewrite: {
        '^/sc/translations': '/renoirb/7a656afd8038ccf7f47e44093bea298c/raw/'
      }
    },
    '/sc/dog': {
      target: 'https://dog.ceo/',
      pathRewrite: {
        '^/sc/dog': '/api/breeds/image/random'
      }
    }
  }
}
