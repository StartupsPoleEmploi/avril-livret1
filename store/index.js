import {percent} from '../utils/number';
import {first, last} from '../utils/array';
import {fraToEng} from '../utils/translate';

export const state = () => ({
  certificationLabel: null,
  currentPath: null,
  hash: null,
  helpContent: null,
  steps: [{
    store: 'education',
    path: 'formations',
    steps: [{
      label: 'Dernière formation',
      to: '/formations',
    },{
      label: 'Niveau',
      to: '/formations/diplome',
    }, {
      label: 'Diplôme(s)',
      to: '/formations/rncp',
    }, {
      label: 'Formations',
      to: '/formations/formations',
    }],
  }, {
    store: 'experiences',
    path: 'experiences',
    steps: [{
      label: 'Expérience',
      to: '/experiences',
    }, {
      label: 'Fonction',
      to: '/experiences/fonction',
    }, {
      label: 'Famille pro',
      to: '/experiences/famille',
    }, {
      label: 'Statut',
      to: '/experiences/statut',
    }, {
      label: 'Période',
      to: '/experiences/periode',
    }, {
      label: 'Activités',
      to: '/experiences/precision',
    }],
  }, {
    store: 'identity',
    path: 'identite',
    steps: [{
      label: 'Lieu de résidence',
      to: '/identite',
    }, {
      label: 'Naissance',
      to: '/identite/naissance',
    }, {
      label: 'Identité',
      to: '/identite/identite',
    }],
  }]
})

export const getters = {
  currentTab: state => {
    return state.currentPath && state.currentPath.split('/')[1];
  },
  currentSteps: (state, getters) => {
    return state.steps.find(step => step.path == getters.currentTab);
  },
  pageTitle: (state, getters) => {
    if (getters.currentSteps) {
      const step = getters.currentSteps.steps.find(s => s.to === state.currentPath);
      if (step) return step.label;
    }
  },
  progress: (state, getters) => {
    const result =  state.steps.map(s => s.store).reduce((val, key, index, keys) => {
      return val + getters[`${key}/progress`] / keys.length;
    }, 0);
    return percent(result / 100);
  },
  flatPaths: state => {
    return state.steps.reduce((flatArray, step) => {
      return flatArray.concat(step.steps)
    }, []).map(s => s.to);
  },
  isTheBeginning: (state, getters) => {
    return state.currentPath === first(getters.flatPaths);
  },
  isTheEnd: (state, getters) => {
    return state.currentPath === last(getters.flatPaths);
  },
}

export const mutations = {
  initState(state, hash, certificationLabel) {
    state.hash = hash;
    state.certificationLabel = certificationLabel;
  },
  setCurrentPath(state, currentPath) {
    state.currentPath = currentPath;
  },
  setHelpContent(state, helpContent) {
    state.helpContent = helpContent;
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
        console.log(result);
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
