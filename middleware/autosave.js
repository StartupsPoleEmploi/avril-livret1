import {
  NO_SAVING,
  SAVING_PENDING,
  SAVING_SUCCESS,
  SAVING_ERROR,
} from '~/constants/index';

import {saveLocalState} from '~/utils/url';

const savingStateNull = store => {
  setTimeout(() => {
    store.commit('setSavingState', null);
  }, 3000);
}

export default async function({store}) {
  if (process.client) {
    store.commit('setSavingState', SAVING_PENDING);
    try {
      await saveLocalState(store);
      store.commit('setSavingState', SAVING_SUCCESS);
    } catch(error) {
      console.error(error);
      store.commit('setSavingState', SAVING_ERROR);
    }
    savingStateNull(store);
  }
}
