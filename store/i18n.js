import Vue from 'vue'

export const state = () => ({
  locale: '',
  messages: false
})

export const mutations = {
  ENABLE_MESSAGES_STORE (state) {
    // console.log('ENABLE_MESSAGES_STORE')
    Vue.set(state, 'messages', {})
  },
  SET_LOCALE (state, locale) {
    state.locale = locale
  },
  SET_MESSAGES (state, messages) {
    Vue.set(state, 'messages', messages)
  }
}

export const getters = {
  locale: state => state.locale,
  isFillMessagesEnabled: state => state.messages !== false,
  messagesKeys: state => Object.keys(state.messages || []),
  messages: state => state.messages
}

export const actions = {
  async switchLocale ({
    commit
  },
  locale
  ) {
    console.log('loading-order: store/i18n actions switchLocale', locale)
    commit('SET_LOCALE', locale)
  },
  async fillMessages ({
    commit,
    getters
  },
  messages
  ) {
    const isFillMessagesEnabled = await getters['isFillMessagesEnabled']
    console.log('loading-order: store/i18n actions fillMessages, isFillMessagesEnabled', isFillMessagesEnabled)
    if (isFillMessagesEnabled) {
      commit('SET_MESSAGES', messages)
    }
  }
}
