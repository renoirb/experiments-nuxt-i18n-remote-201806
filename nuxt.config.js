const i18n = require('./i18n')

module.exports = {
  render: {
    resourceHints: false
  },
  modules: [
    ['nuxt-i18n', i18n],
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    '/language': {
      target: 'https://cdn.rawgit.com/renoirb/7a656afd8038ccf7f47e44093bea298c/raw/*.json'
    },
    '/dog': {
      target: 'https://dog.ceo/',
      pathRewrite: {
        '^/dog': '/api/breeds/image/random'
      }
    }
  }
}
