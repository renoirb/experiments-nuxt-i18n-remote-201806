export const state = () => ({
  count: 0
})

export const mutations = {
  SET_COUNT (state, count) {
    if (state.locales.indexOf(count) !== -1) {
      state.count = count
    }
  }
}
