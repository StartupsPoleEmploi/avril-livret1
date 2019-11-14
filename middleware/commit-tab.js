export default async function ({ store, route } = context) {
  store.commit('setCurrentTab', route.path.split('/')[1])
}

