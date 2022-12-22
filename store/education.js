import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';
import {deduce} from 'avril/js/utils/array';
import {percent} from 'avril/js/utils/number';
import {getKeysDeep} from 'avril/js/utils/number';
import {labelGetter} from 'avril/js/utils/function';
import degreeAnswers from '~/contents/data/degree';
import gradeAnswers from '~/contents/data/grade';

export const state = () => ({
  diplomas: [],
  courses: [],
  grade: null,
  degree: null,
})

const OPTIONAL_FIELDS = [
  'diplomas',
  'courses',
];

const MANDATORY_FIELDS = deduce(getKeysDeep(state()), OPTIONAL_FIELDS.concat(UNSAVABLE_FIELDS));

export const getters = {
  totalFields: (state) => {
    return MANDATORY_FIELDS.length;
  },
  filledFields: (state) => {
    return MANDATORY_FIELDS.filter(f => isPresent(get(state, f))).length
  },
  progress: (state, {filledFields, totalFields}) => {
    return percent(filledFields/totalFields);
  },
  degreeLabel: state => labelGetter(degreeAnswers, state.degree),
  gradeLabel: state => labelGetter(gradeAnswers, state.grade),
}

export const mutations = {
  initState (state, serverState) {
    state = Object.assign(state, serverState);
  },
  addGrade (state, grade) {
    state.grade = grade;
  },
  addDegree (state, degree) {
    state.degree = degree;
  },
  addDiplomas (state, label) {
    state.diplomas.push({label});
  },
  removeDiplomas (state, val) {
    state.diplomas.splice(state.diplomas.findIndex(rd => rd.label === val), 1);
  },
  addCourse (state, label) {
    state.courses.push({label});
  },
  removeCourse (state, val) {
    state.courses.splice(state.courses.findIndex(rd => rd.label === val), 1);
  },
}
