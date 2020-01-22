import { storeToBackend } from "../mappers/toBackend";
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
    fetch(
      `${env.apiUrl}/api/booklet?hash=${store.state.hash}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          civility: storeToBackend.identity(store.state.identity),
          experiences: storeToBackend.experiences(store.state.experiences),
          education: storeToBackend.education(store.state.education),
          ...storeToBackend.index(store.state),
        })
      }
    ).then(response => {
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

    })
    return Promise.resolve(true);
  } else {
    store.commit('setSavingState', NO_SAVING);
    savingStateNull(store);
    return Promise.resolve(true);
  }
}
