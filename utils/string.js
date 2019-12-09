import {last} from '../utils/array';

export const uuid = () =>  (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

export const pluralize = (first, second) => {
  const number = typeof first === 'number' ? first : second;
  const word = typeof first === 'number' ? second : first;
  return `${number === first ? (number+' ') : ''}${word}${number > 1 ? 's' : ''}`
}

export const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const removeTags = str => {
  return str.replace(/\<.*?\>/g, '').replace(/\<\/.*?\>/g, '')
}

export const formatPhoneNumber = value => {
  const matches = ((value || '').replace(/[^0-9]/g, '').substring(0,10).match(/.{1,2}/g) || []);
  if ((last(matches) || []).length === 2) {
    matches.push('');
  }
  return matches.slice(0, 5).join(' ');
};
