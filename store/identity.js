import {isBlank} from '../utils/boolean';
import {percent} from '../utils/number';
import {algoliaResultToAddress, isDomTom} from '../utils/geo';

export const state = () => ({
  lastName: null,
  usageName: null,
  firstNames: null,
  sex: null,
  email: null,
  homePhoneNumber: null,
  cellPhoneNumber: null,
  birthday: null,
  birthPlace: {
    city: null,
    country: null,
    lat: null,
    lng: null,
    isDomTom: null,
  },
  address: {
    street: null,
    city: null,
    postalCode: null,
    country: null,
    lat: null,
    lng: null,
  },
})

const OPTIONAL_FIELDS = [
  'usageName',
];

export const getters = {
  mandatoryState: state => {
    return Object.keys(state).filter(k => !OPTIONAL_FIELDS.includes(k)).reduce((subState, k) => {
      return Object.assign(subState, {[k]: state[k]})
    }, {});
  },
  totalFields: (state, {mandatoryState}) => {
    return Object.values(mandatoryState).length;
  },
  filledFields: (state, {mandatoryState}) => {
    return Object.values(mandatoryState).filter(v => !isBlank(v)).length;
  },
  progress: (state, {filledFields, totalFields}) => {
    return percent(filledFields/totalFields);
  },
}

export const mutations = {
  initState(state, serverState) {
    state = Object.assign(state, serverState)
  },
  addLastName(state, value) {
    state.lastName = value
  },
  addUsageName(state, value) {
    state.usageName = value
  },
  addFirstNames(state, value) {
    state.firstNames = value
  },
  addSex(state, value) {
    state.sex = value
  },
  addDomTom(state, value) {
    state.isDomTom = value; // true or false
  },
  addEmail(state, value) {
    state.email = value
  },
  addHomePhoneNumber(state, value) {
    state.homePhoneNumber = value
  },
  addCellPhoneNumber(state, value) {
    state.cellPhoneNumber = value
  },
  addBirthday(state, value) {
    state.birthday = value
  },
  addBirthPlace(state, value) {
    state.birthPlace = value
  },
  addAddress(state, result) {
    state.address = result
  },
}

export const actions = {
  initState ({commit}, serverState) {
    console.log('action initState called')
    console.log(serverState)
    // state = Object.assign(state, serverState)
    commit('addLastName', serverState.lastName)
    commit('addEmail', serverState.email)
  },

}