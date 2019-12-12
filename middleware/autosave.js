import { storeToBackend } from "../mappers/toBackend";
import {
  SAVING_PENDING,
  SAVING_SUCCESS,
  SAVING_ERROR,
} from '~/constants/index';

export default async function({ store, req, env }) {
  if (process.client && store.state.hash) {
    store.commit('setSavingState', SAVING_PENDING);
    const response = await fetch(
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
    );
    if (response.ok) {
      const data = await response.json();
      store.commit('setSavingState', SAVING_SUCCESS);
    } else {
      store.commit('setSavingState', SAVING_ERROR);
    }
    setTimeout(() => {
      store.commit('setSavingState', null);
    }, 2000);
  } else {
    console.log(
      process.client
        ? "Not authenticated, no save"
        : "Server side, no need to save"
    );
  }
}
