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
      file: 'fr.js'
    },
    {
      code: 'pt',
      iso: 'pt-PT',
      name: 'Português',
      file: 'pt.js'
    }
  ],
  defaultLocale: 'en',
  lazy: true,
  seo: false,
  parsePages: false,
  langDir: 'i18n/',
  vueI18n: {
    fallbackLocale: 'en'
  },
  onLanguageSwitched: (a) => {
    console.log('onLanguageSwitched', a)
  }
}
