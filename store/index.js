// import fetch from 'node-fetch';


const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';


export const state = () => ({
  status: 'ko',
  hash: null,
})

export const mutations = {
  updateStatus(state, newStatus) {
    state.status = newStatus;
  },
  setHash(state, hash) {
    state.hash = hash;
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req, res }) {
    const result = await fetch(`${QUERY_APP_HOST}/api/booklet?hash=${req.query.hash}`)
    const data = await result.json()
    if (result.ok) {
      commit('setHash', req.query.hash)
      commit('updateStatus', data.status)
      commit('identity/initState', data.identity)
      return true;
    } else {
      return false;
    }
  }
}