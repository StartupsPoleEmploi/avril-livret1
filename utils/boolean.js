import isValid from 'date-fns/isValid';

export const isNumber = value => typeof value === 'number'
export const isString = value => typeof value === 'string'
export const isDate = value => (value && typeof value.getMonth === 'function')
export const isArray = value => Array.isArray(value)
export const isObject = value => typeof value === 'object' && value !== null && !isDate(value)

export const isBlank = value => {
  return (
    value === null ||
    value === undefined ||
    isNumber(value) && value === NaN ||
    isString(value) && value.trim().length == 0 ||
    isArray(value) && value.every(isBlank) ||
    isDate(value) && !isValid(value) ||
    isObject(value) && Object.values(value).every(isBlank)
  )
}

export const isPresent = value => !isBlank(value)