import Vue from 'vue';
import get from 'lodash.get';
import { generateUuid } from 'avril/js/utils/string';
import { periodTotalHours } from 'avril/js/utils/time';
import { percent } from 'avril/js/utils/number';
import { BOOKLET_MIN_HOURS } from '~/constants/index';

export const state = () => [];

export const getters = {
  totalHours: state => {
    return state.reduce((accumulatedHours, experience) => {
      return get(experience, 'periods', []).reduce((accumulatedHours2, period) => {
        return accumulatedHours2 + periodTotalHours(period);
      }, accumulatedHours);
    }, 0);
  },
  progress: (state, getters) => {
    return percent(getters.totalHours / BOOKLET_MIN_HOURS);
  },
  current: state => {
    return state.find(e => e.isCurrent);
  },
};

export const mutations = {
  initState(state, serverState) {
    serverState.forEach(e => state.push({
      ...e,
      uuid: e.uuid || generateUuid(),
    }));
  },
  new(state, uuid) {
    state.push({
      uuid,
      isCurrent: false,
      title: null,
      companyName: null,
      fullAddress: {
        street: null,
        city: null,
        postalCode: null,
        country: null,
        lat: null,
        lng: null
      },
      jobIndustry: null,
      employmentType: null,
      skills: [],
      periods: []
    });
  },
  setCurrent(state, uuid) {
    state.forEach((exp, i) => {
      state.splice(i, 1, {...exp, isCurrent: exp.uuid === uuid })
    });
    // state.map(e => Object.assign(e, { isCurrent: e.uuid === uuid }));
  },
  removeCurrent(state) {
    state.forEach((exp, i) => {
      state.splice(i, 1, {...exp, isCurrent: false })
    });
  },
  removeNotFilled(state) {
    state.forEach((exp, i) => {
      if (!(exp.companyName && exp.title)) {
        state.splice(i);
      }
    });
  },
  mutateExperience(state, updatedExperience) {
    state.splice(state.findIndex(a => a.uuid === updatedExperience.uuid), 1, updatedExperience)
  },
  remove(state, uuid) {
    state.splice(state.findIndex(e => e.uuid === uuid), 1);
  }
};

export const actions = {
  newExperience({ commit }) {
    const uuid = generateUuid();
    commit('new', uuid);
    commit('setCurrent', uuid);
  },
  addTitle({ commit, getters }, title) {
    commit('mutateExperience', {
      ...getters.current,
      title
    });
  },
  addCompanyName({ commit, getters }, companyName) {
    commit('mutateExperience', {
      ...getters.current,
      companyName
    });
  },
  addFullAddress({ commit, getters }, fullAddress) {
    commit('mutateExperience', {
      ...getters.current,
      fullAddress
    });
  },
  addJobIndustry({ commit, getters }, jobIndustry) {
    commit('mutateExperience', {
      ...getters.current,
      jobIndustry
    });
  },
  addEmploymentType({ commit, getters }, employmentType) {
    commit('mutateExperience', {
      ...getters.current,
      employmentType
    });
  },
  addPeriod({ commit, getters }, period) {
    commit('mutateExperience', {
      ...getters.current,
      periods: get(getters, 'current.periods', []).concat({
        ...period,
        uuid: generateUuid()
      })
    });
  },
  removePeriod({ commit, getters }, periodId) {
    commit('mutateExperience', {
      ...getters.current,
      periods: get(getters, 'current.periods', []).filter(p => p.uuid !== periodId)
    });
  },
  addSkill({ commit, getters }, label) {
    commit('mutateExperience', {
      ...getters.current,
      skills: [{label}, ...get(getters, 'current.skills', [])],
    });
  },
  removeSkill({ commit, getters }, skill) {
    commit('mutateExperience', {
      ...getters.current,
      skills: get(getters, 'current.skills', []).filter(s => s.label !== skill)
    });
  }
};
