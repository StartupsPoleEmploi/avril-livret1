// import fetch from 'node-fetch';


const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';


export const state = () => ({
  hash: null,
})

export const mutations = {
  setHash(state, hash) {
    console.log('mutation setHash called', state.hash, hash);
    state.hash = state.hash || hash;
  }
}

const redirectToAvril = (redirect, msg) => {
  // redirect(`${QUERY_APP_HOST}/candidatures/actuelle?msg=${msg}`)
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req, res, store, redirect }) {
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
        redirectToAvril(redirect, 'request_failed');
      }
    } else {
      console.log('No hash no request');
      redirectToAvril(redirect, 'not_allowed');
    }
  }
}