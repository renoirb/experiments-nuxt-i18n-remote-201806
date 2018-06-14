import Vue from 'vue'

import {
  localeToLangCode,
} from '~/plugins/i18n'

export const state = () => ({
  locale: 'en-US', // #VueI18nFallbackLocaleEnglish
  messages: {},
  missing: false,
  silentTranslationWarn: true,
})

export const mutations = {
  ENABLE_MESSAGES_STORE (state) {
    Vue.set(state, 'messages', {})
  },
  SET_MESSAGES (state, messages) {
    if (state.messages !== false) {
      Vue.set(state, 'messages', messages)
    }
  },
  ENABLE_MISSING_STORE (state) {
    Vue.set(state, 'missing', {})
  },
  ADD_MISSING (
    state,
    {
      locale = false,
      key = false,
    }
  ) {
    if (
      state.missing !== false &&
      locale !== false &&
      key !== false
    ) {
      if (Reflect.has(state.missing, locale) === false) {
        Vue.set(state.missing, locale, [])
      }
      if (state.missing[locale].includes(key) === false) {
        state.missing[locale].push(key)
      }
    }
  },
  SET_LOCALE (state, locale) {
    state.locale = locale
  },
}

export const getters = {
  locale: state => state.locale,
  langCode: state => localeToLangCode(state.locale),
  isFillMessagesEnabled: state => state.messages !== false,
  isFillMissingEnabled: state => state.messages !== false,
  messagesKeys: state => Object.keys(state.messages || []),
  messages: state => state.messages,
  missing: state => state.missing,
}

export const actions = {
  async switchLocale ({
    commit,
  },
  locale
  ) {
    console.log('loading-order: store/i18n actions switchLocale', locale)
    commit('SET_LOCALE', locale)
  },
  async fillMessages ({
    commit,
    getters,
  },
  messages
  ) {
    const isFillMessagesEnabled = await getters['isFillMessagesEnabled']
    console.log('loading-order: store/i18n actions fillMessages, isFillMessagesEnabled', isFillMessagesEnabled)
    if (isFillMessagesEnabled) {
      commit('SET_MESSAGES', messages)
    }
  },
}
