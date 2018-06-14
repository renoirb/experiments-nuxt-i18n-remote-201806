import Vue from 'vue'
import VueI18n from 'vue-i18n'
import i18n from '~/i18n'
import {
  filterFactory,
} from '~/utils'

Vue.use(VueI18n)

export const localeToLangCode = locale => locale.split('-')[0]

/**
 * See https://nuxt-community.github.io/nuxt-i18n/callbacks.html#usage
 */
export default async function ({
  $axios,
  app,
  store,
}) {
  console.log('loading-order: plugins/i18n')

  // options comes from comes from
  app.i18n = new VueI18n({
    ...i18n.vueI18n,
    missing: (locale, key) => {
      store.commit('i18n/ADD_MISSING', {
        locale,
        key,
      })
    },
    locale: store.state.i18n.locale,
    silentTranslationWarn: store.state.i18n.silentTranslationWarn,
  })

  // Maybe use vuex store, populate using same way as languages files. #TODO
  app.i18n.locales = [...i18n.locales]

  app.i18n.loadedLocales = function loadedLocalesClosure () {
    const loaded = Object.keys(this.messages)
    console.log('loadedLocales', loaded)
    return loaded
  }

  app.i18n.langCode = function langCodeClosure () {
    return localeToLangCode(this.locale)
  }

  app.i18n.loadLanguageAsync = async function loadLanguageAsync (locale) {
    const alreadyLoaded = this.loadedLocales()
    const debugObj = {
      locale,
      loadedLocales: [...alreadyLoaded],
    }
    console.log('loading-order: plugins/i18n loadLanguageAsync BEGIN', debugObj)
    if (!alreadyLoaded.includes(locale) === true) { // WIP HERE — Find different way to tell if loaded.
      // console.log('loading-order: plugins/i18n loadLanguageAsync NOT LOADED')
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/dynamic-import-chunkname.md #TODO
      return import(/* webpackChunkName: "messages-[request]" */ `@/i18n/${locale}`).then(async module => {
        const messagesModule = module.default ? module.default : module
        let messages = {}
        if (typeof messagesModule === 'function') {
          messages = await Promise.resolve(null).then(messagesModule)
        } else {
          messages = {
            ...messagesModule,
          }
        }
        console.log('loadLanguageAsync then', {
          ...messages,
        })
        this.setLocaleMessage(locale, messages)
        // console.log('loading-order: plugins/i18n loadLanguageAsync IMPORT HANDLING SUCCESS END', locale, {...messages})
        return locale
      })
    }
    // console.log('loading-order: plugins/i18n loadLanguageAsync ALREADY LOADED END')
    return Promise.resolve(locale)
  }

  app.i18n.onLocaleSwitch = async function onLocaleSwitcClosure (locale) {
    await this.loadLanguageAsync(locale)
    console.log('loading-order: plugins/i18n onLocaleSwitch BEGIN', locale)
    const subjectLocaleDefinition = filterFactory(app.i18n.locales)('iso', locale)[0]
    const hadBeenFetch = Reflect.has(subjectLocaleDefinition, 'loaded') === false
    if (hadBeenFetch) {
      // const params = {
      //   lang: locale,
      // }
      let url = '/sc/language'
      url += `/${locale.split('-')[0]}.json` // Or using GitHub Gist. /en.json, instead of /en-US.json
      const headers = {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json;charset=utf-8',
      }
      const request = {
        method: 'GET',
        url,
        // params,
        headers,
      }

      const localeDescription = filterFactory(this.locales)('iso', locale)[0]
      const langCode = localeToLangCode(locale)
      const {
        data,
        ...recv
      } = await $axios.request(request)
      console.log('received', {
        ...data,
      })
      const responseURL = recv.request.responseURL || url
      Vue.set(subjectLocaleDefinition, 'loaded', responseURL)
      // console.log('axios received', {
      //   ...recv,
      // })
      const localeMessages = this.getLocaleMessage(locale)
      let messages = {
        locale: {
          ...localeDescription,
        },
        langCode,
        charlie: '😊',
        ...localeMessages,
        ...data,
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
    console.log('loading-order: plugins/i18n onMessagesLoaded END', {
      loadedLocales,
      sanityCheck,
    })
  }

  // Subscribe to
  store.subscribe(async (mutation, state) => {
    console.log('loading-order: plugins/i18n store.subscribe event BEGIN', {
      ...mutation,
    })
    const locale = state.i18n.locale || ''
    // e.g. mutation.type would look like 'i18n/SET_LOCALE'
    //      and we match if it ends by SET_LOCALE
    const isTheMutationWeAreLookingFor = /SET_LOCALE$/i.test(mutation.type)
    // console.log('app.i18n.locales', app.i18n.locales)
    const filterLocales = filterFactory(app.i18n.locales)
    const isSupportedLocale = filterLocales('iso', locale).length === 1
    if (
      isTheMutationWeAreLookingFor &&
        isSupportedLocale
    ) {
      app.i18n.onLocaleSwitch(locale)
    }
  })

  /**
   * IIFE: Immediately Invoked Function Expression, bootstrapping loading locale
   */
  await (async function iifeInit (a) {
    // console.error(`-------------------------- iifeInit app.i18n.locale ${a.locale} -------------------------- `)
    return a.loadLanguageAsync(a.locale)
      .then(locale => {
        console.info(`iifeInit 1/2 at loadLanguageAsync then, for locale ${locale}`)
        // This causes error [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content
        // store.commit('i18n/SET_LOCALE', locale)
        return locale
      })
      .then(locale => {
        console.info(`iifeInit 2/2 at loadLanguageAsync then, for locale ${locale}`)
        // https://vuex.vuejs.org/guide/actions.html#dispatching-actions
        store.dispatch('i18n/switchLocale', locale)

        return locale
      })
  })(app.i18n)
}
