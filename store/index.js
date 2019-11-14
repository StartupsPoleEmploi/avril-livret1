// import fetch from 'node-fetch';

export const state = () => ({
  hash: null,
})

export const mutations = {
  setHash(state, hash) {
    state.hash = state.hash || hash;
  }
}

const redirectToPhoenix = ({redirect, env}, msg) => {
  if (env.phoenixUrl) {
    redirect(`${env.phoenixUrl}/candidatures/actuelle?msg=${msg}`);
  } else {
    console.log('Should redirect but env.phoenixUrl not set');
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req: {query: {hash: queryHash}}, res, store, redirect, env }) {
    console.log('nuxtServerInit called')
    // const queryHash = req.query.hash;
     if (env.apiUrl && queryHash) {
      const result = await fetch(`${env.apiUrl}/api/booklet?hash=${queryHash}`)
      if (result.ok) {
        const data = await result.json()
        console.log('fetched data')
        commit('setHash', queryHash)
        commit('identity/initState', data.identity)
      } else {
        console.log('Request failed');
        redirectToPhoenix({redirect, env}, 'request_failed');
      }
    } else {
      console.log(env.apiUrl ? 'No hash no request' : 'env.apiUrl not set');
      redirectToPhoenix({redirect, env}, 'not_allowed');
    }
  }
}