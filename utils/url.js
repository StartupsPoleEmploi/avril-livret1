import {objectToQueryString} from 'avril/js/utils/url';

export const phoenixUrl = (hash, msg) =>
  (process.env.clientToPhoenixUrl ? `${process.env.clientToPhoenixUrl}/candidatures?${objectToQueryString({hash, msg})}` : null);

export const redirectToPhoenix = ({path, redirect}, hash, msg) => {
  const phoenixUrlWithParams = phoenixUrl(hash, msg)
  if (phoenixUrlWithParams && path !== '/hotjar') {
    redirect(phoenixUrlWithParams);
  } else {
    console.log("Should redirect but env.phoenixUrl not set");
  }
};