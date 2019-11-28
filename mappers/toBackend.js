export const backendToStore = {
  identity: backendData => ({
    sex: backendData.gender,
  }),
  education: backendData => ({
  }),
  experiences: backendData => ([]),
}

export const storeToBackend = {
  identity: state => ({}),
  education: state => ({}),
  experiences: state => ({}),
}