export const state = () => ({
  lastName: null,
  usageName: null,
  firstNames: [],
  sex: null,
  email: null,
  homePhoneNumber: null,
  cellPhoneNumber: null,
  birth: {
    date: null,
    county: null,
    city: null,
    country: 'FR'
  },
  address: {
    streetType: null,
    streetName: null,
    streetNumber: null,
    city: null,
    postalCode: null,
    country: 'FR',
    isDomTom: false,
  },
})

export const mutations = {
  initState (state, serverState) {
    // state = Object.assign(state, serverState)
    state.lastName = serverState.lastName
    state.firstNames = serverState.firstNames
    state.email = serverState.email
  },
  addLastName (state, value) {
    state.lastName = value
  },
  addUsageName (state, value) {
    state.usageName = value
  },
  addFirstNames (state, value) {
    state.firstNames.push(value)
  },
  addSex (state, value) {
    state.sex = value
  },
  addDomTom (state, value) {
    state.isDomTom = value; // true or false
  },
  addEmail (state, value) {
    state.email = value
  },
  addHomePhoneNumber (state, value) {
    state.homePhoneNumber = value
  },
  addCellPhoneNumber (state, value) {
    state.cellPhoneNumber = value
  },
  addBirthDate (state, value) {
    state.birth.date = value
  },
  addBirthCounty (state, value) {
    state.birth.county = value
  },
  addBirthCity (state, value) {
    state.birth.city = value
  },
  addBirthCountry (state, value) {
    state.birth.country = value
  },
  addAddressStreetType (state, value) {
    state.address.streetType = value
  },
  addAddressStreetName (state, value) {
    state.address.streetName = value
  },
  addAddressStreetNumber (state, value) {
    state.address.streetNumber = value
  },
  addAddressCity (state, value) {
    state.address.city = value
  },
  addAddressPostalCode (state, value) {
    state.address.postalCode = value
  },
  addAddressCountry (state, value) {
    state.address.country = value
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