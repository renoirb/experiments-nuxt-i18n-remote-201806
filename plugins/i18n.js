import Vue from 'vue'
import VueI18n from 'vue-i18n'
import i18n from '~/i18n'
import {
  filterFactory
} from '~/utils'

Vue.use(VueI18n)

async function loadLanguageAsync (langCode) {
  const locale = this.locale
  const debugObj = {
    locale,
    langCode
  }
  console.log('loading-order: plugins/i18n loadLanguageAsync BEGIN', debugObj)
  if (locale !== langCode) {
    if (!this.loadedLocales().includes(langCode)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/${langCode}`).then(msgs => {
        this.setLocaleMessage(langCode, msgs.default)
        return langCode
      })
    }
    return Promise.resolve(langCode)
  }
  return Promise.resolve(langCode)
}

/**
 * See https://nuxt-community.github.io/nuxt-i18n/callbacks.html#usage
 */
export default async function ({
  $axios,
  app,
  store
}) {
  console.log('loading-order: plugins/i18n')

  // options comes from comes from
  app.i18n = new VueI18n(i18n.vueI18n)

  // Maybe use vuex store, populate using same way as languages files. #TODO
  app.i18n.locales = [...i18n.locales]

  app.i18n.loadLanguageAsync = loadLanguageAsync

  app.i18n.loadedLocales = function loadedLocalesClosure () {
    return Object.keys(app.i18n.messages)
  }

  app.i18n.isInitialized = (function isInitializedClosure () {
    const locale = this.locale
    const langCode = locale.split('-')[0]
    const test = locale !== ''
    this.loadLanguageAsync(langCode).then(langCode => {
      console.log('loadLangCodeAsync for', langCode)
      // This causes error [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content
      // store.commit('i18n/SET_LOCALE', langCode)
    })
    console.log('isInitialized', test, locale, langCode)
    return test
  }.bind(app.i18n))()

  app.i18n.onLocaleSwitch = async function onLocaleSwitcClosure (locale) {
    console.log('loading-order: plugins/i18n onLocaleSwitch BEGIN')
    const loadedLocales = this.loadedLocales()
    if (loadedLocales.includes(locale) === false) {
      let elsewhere = `/imagine-this-is-a-remote/${locale}`
      elsewhere += '.json' // Because for this experiment, we load a JSON file statically

      const filterLocales = filterFactory(app.i18n.locales)
      const localeDescription = filterLocales('code', locale)[0]
      Reflect.deleteProperty(localeDescription, 'file')
      const payload = await $axios.get(elsewhere).then(recv => recv.data)
      let messages = {
        locale: {...localeDescription},
        langCode: locale,
        ...payload
      }
      app.i18n.onMessagesLoaded(locale, messages)
    }
    console.log('loading-order: plugins/i18n onLocaleSwitch END')
    this.locale = locale
  }

  app.i18n.onMessagesLoaded = async function onMessagesLoadedClosure (locale, messages) {
    console.log('loading-order: plugins/i18n onMessagesLoaded BEGIN')
    await store.dispatch(`i18n/fillMessages`, messages)
    this.mergeLocaleMessage(locale, messages)
    const sanityCheck = this.getLocaleMessage(locale)
    const loadedLocales = this.loadedLocales()
    console.log('loading-order: plugins/i18n onMessagesLoaded END', loadedLocales, {...sanityCheck})
  }

  // Subscribe to
  store.subscribe(async (mutation, state) => {
    console.log('loading-order: plugins/i18n store.subscribe event BEGIN', {...mutation})
    const locale = state.i18n.locale || ''
    // e.g. mutation.type would look like 'i18n/SET_LOCALE'
    //      and we match if it ends by SET_LOCALE
    const isTheMutationWeAreLookingFor = /SET_LOCALE$/i.test(mutation.type)
    // console.log('app.i18n.locales', app.i18n.locales)
    const filterLocales = filterFactory(app.i18n.locales)
    const isSupportedLocale = filterLocales('code', locale).length === 1
    if (
      isTheMutationWeAreLookingFor &&
        isSupportedLocale
    ) {
      app.i18n.onLocaleSwitch(locale)
    }
  })

  const debugObj = {
    locale: app.i18n.locale,
    isInitialized: app.i18n.isInitialized
  }
  console.log('loading-order: plugins/i18n END', debugObj)
}
