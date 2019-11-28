import {isBlank} from '../utils/boolean';
import {percent} from '../utils/number';

export const state = () => ({
  relatedDegrees: [],
  trainings: [],
  latestCourseLevel: null,
  latestDegree: null,
})

const OPTIONAL_FIELDS = [
  'relatedDegrees',
  'trainings'
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
  initState (state, serverState) {
    state = Object.assign(state, serverState);
  },
  addLatestCourseLevel (state, latestCourseLevel) {
    state.latestCourseLevel = latestCourseLevel;
  },
  addLatestDegree (state, latestDegree) {
    state.latestDegree = latestDegree;
  },
  addRelatedDegree (state, val) {
    state.relatedDegrees.push(val);
  },
  removeRelatedDegree (state, val) {
    state.relatedDegrees.splice(state.relatedDegrees.findIndex(rd => rd === val), 1);
  },
  addTraining (state, val) {
    state.trainings.push(val);
  },
  removeTraining (state, val) {
    state.trainings.splice(state.trainings.findIndex(rd => rd === val), 1);
  },
}
