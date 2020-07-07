import get from 'lodash.get';
import { percent } from 'avril/js/utils/number';
import { first, last } from 'avril/js/utils/array';
import { endsWithNoCase } from 'avril/js/utils/string';
import { queryApiWithContext } from 'avril/js/utils/api';
import { fraToEng } from '~/utils/translate';
import { redirectToPhoenix } from '~/utils/url';

import steps from '~/contents/data/steps';

export const state = () => ({
  applicationId: null,
  certificationName: null,
  certifierName: null,
  currentPath: null,
  delegateHash: null,
  hash: null,
  helpContent: null,
  completedAt: null,
  savingState: null,
  isReadOnly: false,
  steps,
});

export const getters = {
  currentTab: state => {
    return state.currentPath && state.currentPath.split("/")[2];
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
    return endsWithNoCase(state.currentPath, first(getters.flatPaths));
  },
  isTheEnd: (state, getters) => {
    return endsWithNoCase(state.currentPath, '/experiences') && getters['experiences/progress'] === 100
  }
};

export const mutations = {
  initState(state, serverState) {
    state = Object.assign(state, serverState)
  },
  setSavingState(state, value){
    state.savingState = value;
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
  async nuxtServerInit({ commit }, context) {
    const applicationId = parseInt(first(get(context, 'params.slug', '').split('-')))
    if (!applicationId) return;
    const [identity, bookletData] = await Promise.all([
      queryApiWithContext(context)('identity'),
      queryApiWithContext(context)({
        name: 'booklet',
        params: {
          applicationId,
        }
      })
    ]);

    const {education, experiences, ...rest} = bookletData;

    commit('initState', {
      applicationId,
      ...rest,
    });
    commit('identity/initState', identity);
    commit('education/initState', education);
    commit('experiences/initState', experiences);
  }
};
