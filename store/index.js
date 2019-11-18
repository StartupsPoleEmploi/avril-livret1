import {percent} from '../utils/number';

export const state = () => ({
  certificationLabel: null,
  currentTab: null,
  hash: null,
  totalWorkedHours: 0,
})

export const getters = {
  progress: (state, getters) => {
    const result =  ['education', 'experiences', 'identity'].reduce((val, key, index, keys) => {
      return val + getters[`${key}/progress`] / keys.length;
    }, 0);
    return percent(result / 100);
  }
}

export const mutations = {
  initState(state, hash, certificationLabel) {
    state.hash = hash;
    state.certificationLabel = certificationLabel;
  },
  setCurrentTab(state, currentTab) {
    state.currentTab = currentTab
  },
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
     if (env.apiUrl && queryHash) {
      const result = await fetch(`${env.apiUrl}/api/booklet?hash=${queryHash}`)
      if (result.ok) {
        const dataWithStatus = await result.json();
        console.log('fetched data', dataWithStatus.data);
        dispatch('initState', Object.assign({hash: queryHash}, dataWithStatus.data));
      } else {
        console.log('Request failed');
        redirectToPhoenix({redirect, env}, 'request_failed');
      }
    } else {
      console.log(env.apiUrl ? 'No hash no request' : 'env.apiUrl not set');
      redirectToPhoenix({redirect, env}, 'not_allowed');
    }
  },
  initState({commit}, {hash, certificationLabel, identity, experiences, education}) {
    commit('initState', hash, certificationLabel);
    commit('identity/initState', identity);
    commit('experiences/initState', experiences);
    commit('education/initState', education);
  }
}
