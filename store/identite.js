export const state = () => ({
  nom: null,
  usageName: null,
  prenoms: [],
  sexe: null,
  email: null,
  telDom: null,
  telPortable: null,
  naissance: {
    date: null,
    departement: null,
    commune: null,
    nationalite: 'FR'
  },
  residence: {
    voieType: null,
    voieName: null,
    numero: null,
    commune: null,
    cp: null,
    pays: 'FR',
    domtom: false,
  },
})

export const mutations = {

  addName (state, value) {
    state.nom = value
  },
  addUsageName (state, value) {
    state.usageName = value
  },
  addPrenoms (state, value) {
    state.prenoms.push(value)
  },
  addSexe (state, value) {
    state.sexe = value
  },
  addDomTom (state, value) {
    state.domtom = value; // true or false
  },
  addEmail (state, value) {
    state.email = value
  },
  addTelDom (state, value) {
    state.telDom = value
  },
  addTelPortable (state, value) {
    state.telPortable = value
  },

  // naissance: {
  //   date: null,
  //   departement: null,
  //   commune: null,
  //   nationalite: 'FR'
  // },
  addDateNaissance (state, value) {
    state.naissance.date = value
  },
  addDepartementNaissance (state, value) {
    state.naissance.departement = value
  },
  addCommuneNaissance (state, value) {
    state.naissance.commune = value
  },
  addNationaliteNaissance (state, value) {
    state.naissance.nationalite = value
  },

  // residence: {
  //   voieType: null,
  //   voieName: null,
  //   numero: null,
  //   commune: null,
  //   cp: null,
  //   pays: 'FR'
  // },
  addVoieTypeResidence (state, value) {
    state.residence.voieType = value
  },
  addVoieNameResidence (state, value) {
    state.residence.voieName = value
  },
  addNumeroResidence (state, value) {
    state.residence.numero = value
  },
  addCommuneResidence (state, value) {
    state.residence.commune = value
  },
  addCPResidence (state, value) {
    state.residence.cp = value
  },
  addPaysResidence (state, value) {
    state.residence.pays = value
  },

}
