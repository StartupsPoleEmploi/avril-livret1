import Vue from "vue";
import { uuid } from "../utils/string";
import { periodTotalHours } from "../utils/time";
import { percent } from "../utils/number";
import { BOOKLET_MIN_HOURS } from "../constants/index";

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
    return state.find(e => e.isCurrent);
  }
};

export const mutations = {
  initState(state, serverState) {
    serverState.forEach(e => state.push(e));
  },
  new(state, id) {
    state.push({
      uuid: id,
      isCurrent: false,
      role: null,
      companyName: null,
      companyAddress: {
        street: null,
        city: null,
        postalCode: null,
        country: null,
        lat: null,
        lng: null
      },
      category: null,
      contractType: null,
      activities: [],
      periods: []
    });
  },
  setCurrent(state, id) {
    state.map(e => Object.assign(e, { isCurrent: e.uuid === id }));
  },
  removeCurrent(state) {
    state.map(e => Object.assign(e, { isCurrent: false }));
  },
  removeNotFilled(state) {
    state.forEach((exp, i) => {
      if (!(exp.companyName && exp.role)) {
        state.splice(state.findIndex(e => e.uuid === exp.uuid));
      }
    });
  },
  mutateExperience(state, fields) {
    state.map(e => (e.uuid === fields.id ? Object.assign(e, fields) : e));
  },
  remove(state, id) {
    state.splice(state.findIndex(e => e.uuid === id), 1);
  }
};

export const actions = {
  newExperience({ commit }) {
    const id = uuid();
    commit("new", id);
    commit("setCurrent", id);
  },
  addRole({ commit, getters }, role) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      role
    });
  },
  addCompanyName({ commit, getters }, companyName) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      companyName
    });
  },
  addCompanyAddress({ commit, getters }, companyAddress) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      companyAddress
    });
  },
  addCategory({ commit, getters }, category) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      category
    });
  },
  addContractType({ commit, getters }, contractType) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      contractType
    });
  },
  addPeriod({ commit, getters }, period) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      periods: getters.current.periods.concat(
        Object.assign(period, { uuid: uuid() })
      )
    });
  },
  removePeriod({ commit, getters }, periodId) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      periods: getters.current.periods.filter(p => p.uuid !== periodId)
    });
  },
  addActivity({ commit, getters }, activity) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      activities: getters.current.activities.concat(
        Object.assign(activity, { uuid: uuid() })
      )
    });
  },
  removeActivity({ commit, getters }, activityId) {
    commit("mutateExperience", {
      id: getters.current.uuid,
      activities: getters.current.activities.filter(a => a.uuid !== activityId)
    });
  }
};
