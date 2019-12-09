import {isBlank} from '../utils/boolean';
import {percent} from '../utils/number';
import {labelGetter} from '../utils/function';
import {algoliaResultToAddress, isDomTom} from '../utils/geo';

import currentSituationAnswers from '~/contents/data/currentSituation';

console.log(currentSituationAnswers)

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
  },
  address: {
    street: null,
    city: null,
    postalCode: null,
    country: null,
    lat: null,
    lng: null,
  },
  nationality: {
    country: null,
    country_code: null,
  },
  currentSituation: {
    status: null,
    employmentType: null,
    registerToPoleEmploi: null,
    registerToPoleEmploiSince: null,
    compensationType: null,
  },
  isHandicapped: null,
})

const OPTIONAL_FIELDS = [
  'usageName',
  'homePhoneNumber',
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
  currentSituationStatusLabel: state => labelGetter(
    currentSituationAnswers.status,
    state.currentSituation.status,
  ),
  currentSituationEmploymentTypeLabel: state => labelGetter(
    currentSituationAnswers.employmentType,
    state.currentSituation.employmentType,
  ),
  currentSituationCompensationTypeLabel: state => labelGetter(
    currentSituationAnswers.compensationType,
    state.currentSituation.compensationType,
  ),
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
  addNationality(state, value) {
    state.nationality = value
  },
  addAddress(state, value) {
    state.address = value
  },
  addCurrentSituationStatus(state, value) {
    state.currentSituation = {status: value}
  },
  addCurrentSituationEmploymentType(state, value) {
    state.currentSituation = {
      status: 'working',
      employmentType: value,
      registerToPoleEmploi: null,
      registerToPoleEmploiSince: null,
      compensationType: null,
    }
  },
  addCurrentSituationRegisterToPoleEmploi(state, value) {
    state.currentSituation = {
      status: 'jobseeking',
      registerToPoleEmploi: value,
      employmentType: null,
    }
  },
  addCurrentSituationRegisterToPoleEmploiSince(state, value) {
    state.currentSituation = {
      status: 'jobseeking',
      registerToPoleEmploi: true,
      registerToPoleEmploiSince: value,
      employmentType: null,
    }
  },
  addCurrentSituationCompensationType(state, value) {
    state.currentSituation = {
      status: 'jobseeking',
      registerToPoleEmploi: true,
      compensationType: value,
      employmentType: null,
    }
  },
  addIsHandicapped(state, value) {
    state.isHandicapped = value
  },

}
