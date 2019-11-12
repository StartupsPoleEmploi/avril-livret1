export const state = () => ({
  heures: 0,
  remplissage: 0,
  monDossier: null,
  displayExperienceStepper: false,
  displayFormationStepper: false,
  displayIdentiteStepper: false,
  tab: 1,
})

export const mutations = {

  // Remplissage
  addRemplissage (state, val) {
    state.remplissage = val
  },
  enableMonDossier (state) {
    state.monDossier = true
  },

  enableExperienceStepper(state) {
    state.displayExperienceStepper = true;
  },
  disableExperienceStepper(state) {
    state.displayExperienceStepper = false;
  },

  enableFormationStepper(state) {
    state.displayFormationStepper = true;
  },
  disableFormationStepper(state) {
    state.displayFormationStepper = false;
  },

  enableIdentiteStepper(state) {
    state.displayIdentiteStepper = true;
  },
  disableIdentiteStepper(state) {
    state.displayIdentiteStepper = false;
  },

  changeTab(state, tab) {
    state.tab = tab;
  },

}
