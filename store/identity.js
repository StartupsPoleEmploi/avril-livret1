import {first} from 'avril/js/utils/array';
import {labelGetter} from 'avril/js/utils/function';

import currentSituationAnswers from '~/contents/data/currentSituation';

export const state = () => ({
  lastName: null,
  usageName: null,
  firstName: null,
  gender: null,
  email: null,
  homePhone: null,
  mobilePhone: null,
  birthday: null,
  birthPlace: {
    city: null,
    county: null,
    country: null,
    lat: null,
    lng: null,
  },
  fullAddress: {
    street: null,
    city: null,
    postalCode: null,
    country: null,
    lat: null,
    lng: null,
  },
  nationality: {
    country: null,
    countryCode: null,
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

export const getters = {
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
  isMan: state => first(state.gender) === 'm',
}

export const mutations = {
  initState(state, serverState) {
    state = Object.assign(state, serverState)
  },
}
