export default async function ({ store, route }) {
  if (route.path && route.path.replace('/', '')) {
    store.commit('setCurrentPath', route.path);
    try {
      const post = await import(`~/contents/help${route.path}${route.path.split('/').length == 2 ? '/index' : ''}.md`);
      store.commit('setHelpContent', post.default);
    } catch(e) {
      store.commit('setHelpContent', null);
    }
  }
}

