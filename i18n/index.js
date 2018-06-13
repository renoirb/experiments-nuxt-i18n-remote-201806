module.exports = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.js'
    },
    {
      code: 'fr',
      iso: 'fr-CA',
      name: 'Français',
      file: 'fr.json'
    },
    {
      code: 'pt',
      iso: 'pt-PT',
      name: 'Português',
      file: 'pt.js'
    }
  ],
  defaultLocale: 'en',
  langDir: 'i18n/',
  lazy: true,
  seo: false,
  detectBrowserLanguage: {
    useCookie: false
  },
  syncVuex: true,
  vueI18n: {
    fallbackLocale: 'en',
    silentTranslationWarn: true
  }
}
