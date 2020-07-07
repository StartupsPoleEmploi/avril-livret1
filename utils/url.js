import get from 'lodash.get';
import {objectToQueryString} from 'avril/js/utils/url';
import { mutateApi } from 'avril/js/utils/api';
// import { mutateApi } from 'avril/js/utils/time';

export const profileUrl = that => `${process.env.profilePath}/mes-candidatures/${get(that, '$route.params.slug')}`

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

export const saveLocalState = async store => {
  return await mutateApi({
    name: 'setBooklet',
    type: 'booklet',
    params: {
      input: {
        applicationId: store.state.applicationId,
        booklet: {
          completedAt: store.state.completedAt,
          education: store.state.education,
          experiences: mapExperiences(store.state.experiences),
        }
      }
    }
  })
}

export const phoenixUrl = (hash, msg) =>
  (process.env.clientToPhoenixUrl ? `${process.env.clientToPhoenixUrl}/candidatures?${objectToQueryString({...hash, msg})}` : null);

// export const redirectToPhoenix = ({path, redirect}, hash, msg) => {
//   const phoenixUrlWithParams = phoenixUrl(hash, msg)
//   if (phoenixUrlWithParams && path !== '/hotjar') {
//     redirect(phoenixUrlWithParams);
//   } else {
//     console.warn("Should redirect but env.phoenixUrl not set");
//   }
// };
