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
  } else if (type == 'country') {
    return {
      country: result.locale_names[0],
      country_code: result.country_code.toUpperCase(),
    }
  } else {
    return {
      city: result.locale_names[0],
      country: result.country,
      country_code: result.country_code,
      lat: result._geoloc.lat,
      lng: result._geoloc.lng,
      domTom: domTomAdministrative(result),
    }
  }
}

export const addressLabelify = address => {
  if (isBlank(address)) return null;
  if (typeof address === 'string') return address;
  if (address.street) return `${address.street}\n ${address.postalCode} ${address.city}, ${address.country}`;
  if (address.domTom) return `${address.city}, ${address.domTom}, ${address.country}`;
  if (address.city && address.country) return `${address.city}, ${address.country}`;
  if (address.city) return `${address.city}`;
  return `${address.country} (${address.country_code})`
}
