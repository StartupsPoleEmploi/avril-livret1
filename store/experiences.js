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
  }
}

export const mutations = {
  initState (state, serverState) {
    state = state.concat(serverState);
  },
  new (state) {
    state.push({
      uuid: uuid(),
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
  // TODO: manipulate IDs instead of state.length -1
  addRole (state, role) {
    state[state.length - 1].role = role
  },
  addCompanyName (state, companyName) {
    state[state.length - 1].companyName = companyName
  },
  addCompanyAddress (state, adress) {
    state[state.length - 1].companyAddress = adress
  },
  addCategory (state, category) {
    state[state.length - 1].category = category
  },
  addContractType (state, contractType) {
    state[state.length - 1].contractType = contractType
  },
  addActivity (state, val) {
    state[state.length - 1].activities.push(val)
  },
  addPeriods (state, val) {
    state[state.length - 1].periods.push(val)
  },
  addHours (state, hours) {
    state[state.length - 1].hours = hours
  },
  remove (state, { todo }) {
    state.splice(state.indexOf(todo), 1)
  },

}
