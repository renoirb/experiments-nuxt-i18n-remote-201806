// See https://nuxt-community.github.io/nuxt-i18n/callbacks.html#usage
export default async function ({ $axios, app }) {
  console.log('experiment: plugins/i18n')
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    console.log('experiment: beforeLanguageSwitch(oldLocale, newLocale) plugin', oldLocale, newLocale)
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = async (oldLocale, newLocale) => {
    // see node_modules/nuxt-i18n/src/templates/middleware.js
    const normalizedLocaleName = newLocale.toLowerCase()
    const loaded = app.i18n.loadedLanguages
    const messages = {...app.i18n.messages[newLocale]}
    const remote = await $axios.get(`/hpi/translations/${normalizedLocaleName}.json`).then(recv => recv.data)
    app.i18n.mergeLocaleMessage(newLocale, remote)

    console.log('experiment: onLanguageSwitched plugin', oldLocale, newLocale, loaded, messages, remote)
  }
}
