const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';

export default async function ({ store, req } = context) {
  if (process.client && store.state.hash) {
    const response = await fetch(`${QUERY_APP_HOST}/api/booklet?hash=${store.state.hash}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: store.state.identity,
        experiences: store.state.experiences,
      })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(':) Saved', data);
    } else {
      console.log(':( Could not save')
    }
  } else {
    console.log(process.client ? 'Not authenticated, no save' : 'Server side, no need to reload')
  }
}

