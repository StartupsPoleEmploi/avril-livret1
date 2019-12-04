import {isBlank} from './boolean.js';

// TODO
export const domTomAdministrative = result => {
  if (result.country_code === 'fr') {
    const countyNb = parseInt(((result.postcode || [])[0] || '').substring(0, 2));
    return countyNb === 97 ? result.administrative : null;
  }
};

export const algoliaToAddress = (type, result) => {
  if (type == 'address') {
    return {
      street: result.locale_names[0],
      city: (result.city || [])[0],
      postalCode: (result.postcode || [])[0],
      country: result.country,
      lat: result._geoloc.lat,
      lng: result._geoloc.lng,
    }
  } else {
    return {
      city: result.locale_names[0],
      country: result.country,
      lat: result._geoloc.lat,
      lng: result._geoloc.lng,
      domTom: domTomAdministrative(result),
    }
  }
}

export const addressLabelify = address => {
  if (isBlank(address)) return null;
  if (address.street) return `${address.street}\n ${address.postalCode} ${address.city}, ${address.country}`;
  if (address.domTom) return `${address.city}, ${address.domTom}, ${address.country}`;
  return `${address.city}, ${address.country}`;
}
