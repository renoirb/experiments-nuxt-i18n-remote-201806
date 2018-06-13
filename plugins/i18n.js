// See https://nuxt-community.github.io/nuxt-i18n/callbacks.html#usage
export default async function ({ $axios, app, store }) {
  console.log('charlie: plugins/i18n')

  store.subscribe(async (mutation, state) => {
    const isSetMessageMutation = /SET_MESSAGES$/i.test(mutation.type)
    console.log('charlie: plugins/i18n store.subscribe BEGIN', {...mutation})
    if (isSetMessageMutation) {
      const locale = state.i18n.locale
      const payload = mutation.payload
      const remote = await $axios.get(`/sc/translations/${locale}.json`).then(recv => recv.data)
      let messages = {
        languageCode: locale,
        ...payload,
        ...remote
      }
      console.log(`charlie: plugins/i18n store.subscribe BEFORE ${locale}`, {...messages})
      // store.commit(mutation.type, messages)
      app.i18n.mergeLocaleMessage(locale, messages)
      const after = app.i18n.getLocaleMessage(locale)
      console.log(`charlie: plugins/i18n store.subscribe AFTER ${locale}`, {...after})
    }
  })
  // $nuxt.$store.dispatch('i18n/setMessages', $nuxt.$i18n.getLocaleMessage('fr'))

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

  app.i18n.onLanguageSwitched = async function onLanguageSwitchedClosure (oldLocale, locale) {
    const loadedLanguages = this.loadedLanguages // Because we are in a i18n instance method
    // see node_modules/nuxt-i18n/src/templates/middleware.js
    // console.log('onLanguageSwitched', {...app.i18n.messages[locale]})
    // const loaded = app.i18n.loadedLanguages
    // const messages = {...app.i18n.messages[locale]}
    const foo = this.messages[locale]
    const remote = await $axios.get(`/sc/translations/${locale}.json`).then(recv => recv.data)
    const messages = {
      languageCode: locale,
      ...foo,
      ...remote
    }
    console.log('onLanguageSwitched', {loadedLanguages, oldLocale, locale, messages: {...messages}})
    // this.mergeLocaleMessage(locale, {...messages})

    // console.log('experiment: onLanguageSwitched plugin', oldLocale, locale, loaded, messages, remote)
  }
}
