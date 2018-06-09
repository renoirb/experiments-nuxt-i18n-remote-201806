module.exports = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.js'
    }
  ],
  defaultLocale: 'en',
  seo: false,
  lazy: false,
  langDir: 'i18n/',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: {
        hello: 'Hello!'
      },
      fr: {
        hello: 'Bonjour!'
      }
    }
  }
}