import {isBlank} from './boolean.js';

// TODO
export const isDomTom = result => false;

export const algoliaToAddress = (type, result) => {
  if (type == 'address') {
    return {
      street: result.locale_names[0],
      city: result.city[0],
      postalCode: result.postcode[0],
      country: result.country,
      isDomTom: isDomTom(result),
    }
  } else {
    return {
      city: result.locale_names[0],
      country: result.country,
      isDomTom: isDomTom(result),
    }
  }
}

export const addressLabelify = address => {
  if (isBlank(address)) return null;
  if (address.street) return `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`;
  return `${address.city}, ${address.country}`;
}
