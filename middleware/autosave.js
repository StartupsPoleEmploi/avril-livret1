import { exceptKeys } from 'avril/js/utils/object';
import { mutateApi } from 'avril/js/utils/api';

import {
  NO_SAVING,
  SAVING_PENDING,
  SAVING_SUCCESS,
  SAVING_ERROR,
} from '~/constants/index';

const mapExperiences = experiences => experiences
  .filter(e => e.title && e.companyName)
  .map(({isCurrent, periods, ...experienceInfos}) => {
    return {
      ...experienceInfos,
      periods: periods.map(({uuid, ...periodInfos}) => {
        return periodInfos
      }),
    }
  })

const savingStateNull = store => {
  setTimeout(() => {
    store.commit('setSavingState', null);
  }, 3000);
}

export default async function({store}) {
  if (process.client) {
    store.commit('setSavingState', SAVING_PENDING);
    try {
      await mutateApi({
        name: 'setBooklet',
        type: 'booklet',
        params: {
          input: {
            applicationId: store.state.applicationId,
            booklet: {
              education: store.state.education,
              experiences: mapExperiences(store.state.experiences),
            }
          }
        }
      })
      store.commit('setSavingState', SAVING_SUCCESS);
    } catch(error) {
      console.error(error);
      store.commit('setSavingState', SAVING_ERROR);
    }
    savingStateNull(store);
  }
}
