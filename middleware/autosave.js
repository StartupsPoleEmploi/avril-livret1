import {saveLocalState} from '~/utils/url';
import {
  NO_SAVING,
  SAVING_PENDING,
  SAVING_SUCCESS,
  SAVING_ERROR,
} from '~/constants/index';

const savingStateNull = store => {
  setTimeout(() => {
    store.commit('setSavingState', null);
  }, 3000);
}

export default function({ store, req, env }) {
  if (process.client && store.state.hash) {
    store.commit('setSavingState', SAVING_PENDING);
    saveLocalState(env.clientToPhoenixUrl)(store).then(response => {
      if (response.ok) {
        response.json().then(data => {
          if (data.status === 'ok') {
            store.commit('setSavingState', SAVING_SUCCESS);
          } else {
            store.commit('setSavingState', SAVING_ERROR);
          }
          savingStateNull(store);
        })
      } else {
        console.error(response);
        store.commit('setSavingState', SAVING_ERROR);
        savingStateNull(store);
      }

    }).catch(error => {
        console.error(error);
        store.commit('setSavingState', SAVING_ERROR);
        savingStateNull(store);
      })
    return Promise.resolve(true);
  } else {
    store.commit('setSavingState', NO_SAVING);
    savingStateNull(store);
    return Promise.resolve(true);
  }
}
