export const state = () => ({
  count: 0,
  dog: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTA', // Empty pixel
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
}

export const actions = {
  async countPlusOne ({
    commit,
  }) {
    commit('INCREMENT_COUNT')
  },
  async hydrateDog ({
    commit,
  }) {
    const {
      data: {
        message: dog,
      },
    } = await this.$axios.get('/sc/dog')
    commit('SET_DOG', dog)
  },
  nuxtServerInit ({
    commit,
  }, {
    req,
  }) {
    console.log('loading-order: store actions nuxtServerInit', {
      ...req,
    })
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  },
}
