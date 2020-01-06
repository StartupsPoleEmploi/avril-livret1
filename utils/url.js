export const objectToQueryString = object => Object.keys(object).filter(k => object[k]).map(k => {
  return `${encodeURIComponent(k)}=${encodeURIComponent(object[k])}`
}).join('&');

export const phoenixUrl = (hash, msg) =>
  (process.env.phoenixUrl ? `${process.env.phoenixUrl}/candidatures?${objectToQueryString({hash, msg})}` : null);

export const redirectToPhoenix = ({path, redirect}, hash, msg) => {
  const phoenixUrlWithParams = phoenixUrl(hash, msg)
  if (phoenixUrlWithParams && path !== '/hotjar') {
    redirect(phoenixUrlWithParams);
  } else {
    console.log("Should redirect but env.phoenixUrl not set");
  }
};