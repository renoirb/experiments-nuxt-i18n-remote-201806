module.exports = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
    {
      code: 'fr',
      iso: 'fr-CA',
      name: 'Français',
    },
    {
      code: 'pt',
      iso: 'pt-BR',
      name: 'Português',
    },
  ],
  vueI18n: {
    fallbackLocale: 'en-US', // #VueI18nFallbackLocaleEnglish
    // locale: 'en-US',     // < We will use Vuex
  },
}
