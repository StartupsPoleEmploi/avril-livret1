// import fetch from 'node-fetch';


const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';


export const state = () => ({
  hash: null,
})

export const mutations = {
  setHash(state, hash) {
    state.hash = state.hash || hash;
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req, res, store }) {
    console.log('nuxtServerInit called')
    const queryHash = req.query.hash;
     if (queryHash) {
      const result = await fetch(`${QUERY_APP_HOST}/api/booklet?hash=${queryHash}`)
      if (result.ok) {
        const data = await result.json()
        console.log('fetched data')
        commit('setHash', queryHash)
        commit('identity/initState', data.identity)
      } else {
        console.log('Request failed');
      }
    } else {
      console.log('No hash no request');
    }
  }
}