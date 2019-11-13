// export default async function ({ store, redirect }) {
//   console.log(store);
//   // return new Promise(true);
//   await true;
// }

const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';

const fetchData = async function(store, queryHash) {
  if (queryHash) {
    console.log('Fetching data')
    const result = await fetch(`${QUERY_APP_HOST}/api/booklet?hash=${queryHash}`)
    if (result.ok) {
      const data = await result.json()
      store.commit('application/setHash', queryHash)
      store.dispatch('identity/initState', data.identity)
    } else {
      console.log('Fetch data failed');
    }
  } else {
    console.log('No hash no request');
  }

}

export default async function ({ store, req } = context) {
  console.log("(Global Middleware) SSR: " + process.server);
  console.log(store.state.hash)

  // if (store.state.hash) {
  //   console.log('Hash already set');
  // } else if (process.server && req.query.hash) {
  //   await fetchData(store, req.query.hash)
  // }
}

