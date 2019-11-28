export const isBlank = value => {
  return (value === false) ||
    (value === null) ||
    (value === undefined) ||
    (value === 0) ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.every(isBlank)) ||
    (typeof value === 'object') && Object.values(value).every(isBlank)
}