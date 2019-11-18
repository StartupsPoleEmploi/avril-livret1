export const state = () => ({
  hash: null,
  totalWorkedHours: 0,
  progress: 0,
  applicationStatus: null,
  currentTab: null,
  currentDegree: 'CAP - Accompagnement éducatif - petite enfance',
})

export const mutations = {
  setCurrentTab(state, currentTab) {
    state.currentTab = currentTab
  },
  setHash(state, hash) {
    state.hash = state.hash || hash;
  },
  updateProgress (state, progress) {
    state.progress = progress
  },
  setApplicationStatus(state, applicationStatus) {
    state.applicationStatus = applicationStatus
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
