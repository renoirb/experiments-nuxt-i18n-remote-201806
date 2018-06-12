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
  detectBrowserLanguage: {
    useCookie: false
  },
  lazy: true,
  syncVuex: true,
  seo: false,
  langDir: 'i18n/',
  vueI18n: {
    fallbackLocale: 'en',
    silentTranslationWarn: true
  }
}
