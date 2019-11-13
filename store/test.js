export const state = () => ({
  status: 'ko'
})

export const mutations = {
  updateStatus(state, newState) {
    return {
      status: newState.status
    }
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req, res }) {
    console.log(req, res);
    // commit('test', )
  }
}