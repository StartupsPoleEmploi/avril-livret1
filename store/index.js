import { percent } from "../utils/number";
import { first, last } from "../utils/array";
import { fraToEng } from "../utils/translate";
import { redirectToPhoenix } from "../utils/url";

import steps from '~/contents/data/steps';

import { backendToStore } from "../mappers/toStore";

export const state = () => ({
  certificationLabel: null,
  certifierLabel: null,
  currentPath: null,
  hash: null,
  helpContent: null,
  completedAt: null,
  steps,
});

export const getters = {
  currentTab: state => {
    return state.currentPath && state.currentPath.split("/")[1];
  },
  currentSteps: (state, getters) => {
    return state.steps.find(step => step.path == getters.currentTab);
  },
  pageTitle: (state, getters) => {
    if (getters.currentSteps) {
      const step = getters.currentSteps.steps.find(
        s => s.to === state.currentPath
      );
      if (step) return step.label;
    }
  },
  progress: (state, getters) => {
    const result = state.steps
      .map(s => s.store)
      .reduce((val, key, index, keys) => {
        return val + getters[`${key}/progress`] / keys.length;
      }, 0);
    return percent(result / 100);
  },
  flatPaths: state => {
    return state.steps
      .reduce((flatArray, step) => {
        return flatArray.concat(step.steps);
      }, [])
      .map(s => s.to);
  },
  isTheBeginning: (state, getters) => {
    return state.currentPath === first(getters.flatPaths);
  },
  isTheEnd: (state, getters) => {
    return state.currentPath === last(getters.flatPaths);
  }
};

export const mutations = {
  initState(state, serverState) {
    state = Object.assign(state, serverState)
  },
  setCurrentPath(state, currentPath) {
    state.currentPath = currentPath;
  },
  setHelpContent(state, helpContent) {
    state.helpContent = helpContent;
  },
  markAsComplete(state) {
    state.completedAt = new Date();
  }
};

export const actions = {
  async nuxtServerInit(
    { commit, dispatch },
    {
      app,
      env,
      req: {
        query: { hash }
      },
      redirect,
    }
  ) {
    if (hash) {
      app.$cookies.set('hash', hash);
    } else {
      hash = app.$cookies.get('hash');
    }
    if (env.apiUrl && hash) {
      const apiUrl = `${env.apiUrl}/api/booklet?hash=${hash}`;
      const result = await fetch(apiUrl);
      if (result.ok) {
        const dataWithStatus = await result.json();
        // console.log("fetched data", dataWithStatus.data);
        dispatch(
          "initState",
          Object.assign({ hash }, dataWithStatus.data)
        );
      } else {
        console.error("Request failed");
        redirectToPhoenix(redirect, hash, "request_failed");
      }
    } else {
      console.warn(env.apiUrl ? "No hash no request" : "env.apiUrl not set");
      redirectToPhoenix(redirect, hash, "not_allowed");
    }
  },
  initState(
    { commit },
    { civility, experiences, education, ...rest }
  ) {
    commit(
      "initState",
      backendToStore.index(rest)
    );
    commit(
      "identity/initState",
      backendToStore.identity(civility || {})
    );
    commit(
      "experiences/initState",
      backendToStore.experiences(experiences || [])
    );
    commit(
      "education/initState",
      backendToStore.education(education || {})
    );
  }
};
