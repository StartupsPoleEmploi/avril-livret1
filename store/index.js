import fetch from 'node-fetch';


const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';


export const state = () => ({
  status: 'ko'
})

export const mutations = {
  updateStatus(state, newState) {
    state.status = newState.status
  }
}

export const actions = {
  // nuxtServerInit ({ commit }, { req, res }) {
  //   fetch(`${QUERY_APP_HOST}/api/booklet?hash=${req.query.hash}`)
  //     .then(data => {
  //       console.log(data)
  //       if (data.ok) {
  //         // commit('index/updateStatus', data)
  //       } else {
  //       }
  //     })
  //     .catch(error => redirectToApp(req, res, next));
  // }
}