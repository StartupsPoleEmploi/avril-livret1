import Vue from 'vue';
import {uuid} from '../utils/string';
import {percent} from '../utils/number';
import {BOOKLET_MIN_HOURS} from '../constants/index';

export const state = () => ([])

export const getters = {
  totalHours: state => {
    return state.reduce((accumulatedHours, experience) => {
      return accumulatedHours + experience.hours;
    }, 0);
  },
  progress: (state, getters) => {
    return percent(getters.totalHours / BOOKLET_MIN_HOURS);
  },
  current: state => {
    return state.find(e => e.isCurrent);
  }
}

export const mutations = {
  initState (state, serverState) {
    state = state.concat(serverState);
  },
  new (state, id) {
    state.push({
      uuid: id,
      isCurrent: false,
      role: null,
      companyName: null,
      companyAddress: null,
      category: null,
      contractType: null,
      activities: [],
      periods: [],
      hours: 0
    })
  },
  setCurrent(state, id) {
    state.map(e => Object.assign(e, {isCurrent: e.uuid === id}))
  },
  mutateExperience (state, experience, fields) {
    Vue.set(state, state.findIndex(e => e.uuid === experience.uuid), fields);

    // state[state.findIndex(e => e.uuid === experience.uuid)] = Object.assign({}, experience, fields)
  },
  remove (state, id) {
    state.splice(state.findIndex(e => e.uuid === id), 1)
  },
}

export const actions = {
  newExperience({commit}){
    const id = uuid();
    commit('new', id);
    commit('setCurrent', id);
  },
  addRole({commit, getters}, role) {
    console.log(getters.current, role)
    commit('mutateExperience', getters.current, {role})
  },
  addCompanyName({commit, getters}, companyName) {
    commit('mutateExperience', getters.current, {companyName})
  },
  addCompanyAddress({commit, getters}, companyAddress) {
    commit('mutateExperience', getters.current, {companyAddress})
  },
  addCategory({commit, getters}, category) {
    commit('mutateExperience', getters.current, {category})
  },
  addContractType({commit, getters}, contractType) {
    commit('mutateExperience', getters.current, {contractType})
  },
  addHours({commit, getters}, hours) {
    commit('mutateExperience', getters.current, {hours})
  },
  addPeriod({commit, getters}, period) {
    commit('mutateExperience', getters.current, {periods: getters.current.periods.concat(period)})
  },
  removePeriod({commit, getters}, periodId) {
    commit('mutateExperience', getters.current, {periods: getters.current.periods.filter(p => p.uuid === periodId)})
  },
  addActivity({commit, getters}, activity) {
    commit('mutateExperience', getters.current, {activities: getters.current.activities.concat(activity)})
  },
  removeActivity({commit, getters}, activityId) {
    commit('mutateExperience', getters.current, {periods: getters.current.activities.filter(a => a.uuid === activityId)})
  },
}
