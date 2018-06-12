// See https://nuxt-community.github.io/nuxt-i18n/callbacks.html#usage
export default async function ({ $axios, app }) {
  /* WIP
  console.log('experiment: plugins/i18n')
  app.i18n.optionalLanguageGuesser = (context) => {
    console.log('optionalLanguageGuesser called')
  }
  app.i18n.optionalMessagesMerger = (a) => {
    console.log('optionalMessagesMerger', a)
  }
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    console.log('experiment: beforeLanguageSwitch(oldLocale, newLocale) plugin', oldLocale, newLocale)
  }
  */
  // Called right after a new locale has been set
  // Make sure this is a function, not an arrow () => {}, we loose the this reference
  app.i18n.onLanguageSwitched = async function (oldLocale, newLocale) {
    // see node_modules/nuxt-i18n/src/templates/middleware.js
    console.log('onLanguageSwitched', {...app.i18n.messages[newLocale]})
    const normalizedLocaleName = newLocale.toLowerCase()
    const loaded = app.i18n.loadedLanguages
    const messages = {...app.i18n.messages[newLocale]}
    const remote = await $axios.get(`/hpi/translations/${normalizedLocaleName}.json`).then(recv => recv.data)
    app.i18n.mergeLocaleMessage(newLocale, remote)

    console.log('experiment: onLanguageSwitched plugin', oldLocale, newLocale, loaded, messages, remote)
  }
}
