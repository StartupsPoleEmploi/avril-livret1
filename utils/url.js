import get from 'lodash.get';
import {objectToQueryString} from 'avril/js/utils/url';
import { storeToBackend } from '~/mappers/toBackend';

export const profileUrl = that => `${process.env.profilePath}/mes-candidatures/${get(that, '$route.params.slug')}`

export const phoenixUrl = (hash, msg) =>
  (process.env.clientToPhoenixUrl ? `${process.env.clientToPhoenixUrl}/candidatures?${objectToQueryString({...hash, msg})}` : null);

export const redirectToPhoenix = ({path, redirect}, hash, msg) => {
  const phoenixUrlWithParams = phoenixUrl(hash, msg)
  if (phoenixUrlWithParams && path !== '/hotjar') {
    redirect(phoenixUrlWithParams);
  } else {
    console.warn("Should redirect but env.phoenixUrl not set");
  }
};

export const saveLocalState = host => store => {
  return fetch(
    `${host || ''}/api/booklet?hash=${store.state.hash}`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        civility: storeToBackend.identity(store.state.identity),
        experiences: storeToBackend.experiences(store.state.experiences),
        education: storeToBackend.education(store.state.education),
        ...storeToBackend.index(store.state),
      })
    }
  )
}