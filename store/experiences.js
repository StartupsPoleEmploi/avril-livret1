import Vue from 'vue';
import { generateUuid } from 'avril/js/utils/string';
import { periodTotalHours } from 'avril/js/utils/time';
import { percent } from 'avril/js/utils/number';
import { BOOKLET_MIN_HOURS } from '~/constants/index';

export const state = () => [];

export const getters = {
  totalHours: state => {
    return state.reduce((accumulatedHours, experience) => {
      return experience.periods.reduce((accumulatedHours2, period) => {
        return accumulatedHours2 + periodTotalHours(period);
      }, accumulatedHours);
    }, 0);
  },
  progress: (state, getters) => {
    return percent(getters.totalHours / BOOKLET_MIN_HOURS);
  },
  current: state => {
    console.log('calculating current', state)
    return state.find(e => e.isCurrent);
  },
};

export const mutations = {
  initState(state, serverState) {
    serverState.forEach(e => state.push(e));
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
    state.map(e => Object.assign(e, { isCurrent: e.uuid === uuid }));
  },
  removeCurrent(state) {
    state.map(e => Object.assign(e, { isCurrent: false }));
  },
  removeNotFilled(state) {
    state.forEach((exp, i) => {
      if (!(exp.companyName && exp.title)) {
        state.splice(state.findIndex(e => e.uuid === exp.uuid));
      }
    });
  },
  mutateExperience(state, updatedExperience) {
    console.log(state, updatedExperience)
    // state.forEach((exp, i) => {
    //   if (exp.uuid === updatedExperience.uuid) {
    //     state[i] = {...exp, ...updatedExperience}
    //   }
    // });

    state.map(e => (e.uuid === updatedExperience.uuid ? Object.assign(e, updatedExperience) : e));
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
    console.log('store title', getters.current.uuid, title)
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      title
    });
  },
  addCompanyName({ commit, getters }, companyName) {
    console.log(getters.current.uuid, companyName)
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      companyName
    });
  },
  addFullAddress({ commit, getters }, fullAddress) {
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      fullAddress
    });
  },
  addJobIndustry({ commit, getters }, jobIndustry) {
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      jobIndustry
    });
  },
  addEmploymentType({ commit, getters }, employmentType) {
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      employmentType
    });
  },
  addPeriod({ commit, getters }, period) {
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      periods: getters.current.periods.concat({
        ...period,
        uuid: generateUuid()
      })
    });
  },
  removePeriod({ commit, getters }, periodId) {
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      periods: getters.current.periods.filter(p => p.uuid !== periodId)
    });
  },
  addSkill({ commit, getters }, label) {
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      skills: [{label}, ...getters.current.skills],
    });
  },
  removeSkill({ commit, getters }, skill) {
    commit('mutateExperience', {
      uuid: getters.current.uuid,
      skills: getters.current.skills.filter(s => s.label !== skill)
    });
  }
};
