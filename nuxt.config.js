const i18nExtensions = require('vue-i18n-extensions')

module.exports = {
  modules: [
    '@nuxtjs/axios'
    // No need to add @nuxtjs/proxy, axios nuxt module already loads it
  ],
  plugins: [
    '~/plugins/i18n',
  ],
  router: {
    middleware: [
      'i18n',
    ],
  },
  axios: {
    proxy: true, // Can be also an object with default options
  },
  proxy: {
    /**
     * sc => Side-Car ... What's useful to Nuxt, but would be an useless API by itself.
     *
     * Here, let's just use Nuxt/Axios/Proxy to another service.
     */
    '/sc/dog': {
      target: 'https://dog.ceo/',
      pathRewrite: {
        '^/sc/dog': '/api/breeds/image/random',
      },
    },
    '/sc/language': {
      target: 'https://rawgit.com/',
      pathRewrite: {
        '^/sc/language/': '/renoirb/7a656afd8038ccf7f47e44093bea298c/raw/',
      },
    },
  },
  render: {
    // confiture `render`
    // see Nuxt.js docs: https://nuxtjs.org/api/configuration-render#bundleRenderer
    bundleRenderer: {
      directives: {
        t: i18nExtensions.directive,
      },
    },
  },
  build: {
    vendor: [
      'vue-i18n',
      '~/plugins/i18n',
    ],
  },
}
