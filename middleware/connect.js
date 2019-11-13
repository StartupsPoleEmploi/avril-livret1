
const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';

export default function ({ store, redirect }) {
  // If the user is not authenticated
  // if (!store.state.authenticated) {
  //   return redirect(REDIRECT_APP_HOST)
  // }
  console.log(store);
  return true;
}
