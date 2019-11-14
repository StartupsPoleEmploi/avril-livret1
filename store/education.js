export const state = () => ({
  relatedDegrees: [],
  trainings: [],
  latestCourseLevel: null,
  latestDegree: null,
})

export const mutations = {
  initState (state, serverState) {
    state = Object.assign(state, serverState)
  },
  addLastCourseLevel (state, latestCourseLevel) {
    state.latestCourseLevel = latestCourseLevel
  },
  addLatestDegree (state, latestDegree) {
    state.latestDegree = latestDegree
  },
  addRelatedDegree (state, val) {
    state.relatedDegrees.push(val)
  },
  addTraining (state, val) {
    state.trainings.push(val)
  },
}