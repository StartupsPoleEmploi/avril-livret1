import isValid from 'date-fns/isValid';

export const isPresent = value => {
  return
    isValid(value) ||
    value !== null ||
    value !== undefined ||
    value !== NaN ||
    typeof value === 'string' && value.trim().length > 0 ||
    Array.isArray(value) && value.any(isPresent) ||
    typeof value === 'object' && Object.values(value).any(isPresent)
}

export const isBlank = value => !isPresent(value);
