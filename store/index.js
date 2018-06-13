export const state = () => ({
  count: 0,
  dog: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTA', // Empty pixel
  translations: {}
})

export const mutations = {
  SET_COUNT (state, count) {
    if (state.locales.indexOf(count) !== -1) {
      state.count = count
    }
  },
  INCREMENT_COUNT (state) {
    state.count++
  },
  SET_DOG (state, dog) {
    if (typeof dog === 'string' && dog !== '') {
      state.dog = dog
    }
  },
  SET_TRANSLATIONS (state, translations) {
    state.translations = {...translations}
  }
}

export const actions = {
  async countPlusOne ({
    commit
  }) {
    commit('INCREMENT_COUNT')
  },
  async hydrateDog ({
    commit
  }) {
    const { data: { message: dog } } = await this.$axios.get('/sc/dog')
    commit('SET_DOG', dog)
  },
  async hydrateTranslation ({
    commit
  },
  locale
  ) {
    const elsewhere = `/sc/translations/${locale}.json`
    const translations = await this.$axios.get(elsewhere).then(recv => recv.data)
    console.log('hydrateTranslations', translations)
    commit('SET_TRANSLATIONS', translations)
  }
}
