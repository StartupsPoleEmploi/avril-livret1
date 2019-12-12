import { storeToBackend } from "../mappers/toBackend";
import {
  SAVING_PENDING,
  SAVING_SUCCESS,
  SAVING_ERROR,
} from '~/constants/index';

const savingStateNull = store => {
  setTimeout(() => {
    store.commit('setSavingState', null);
  }, 2000);
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
          store.commit('setSavingState', SAVING_SUCCESS);
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
    console.log(
      process.client
        ? "Not authenticated, no save"
        : "Server side, no need to save"
    );
    return Promise.resolve(true);
  }
}
