export const isBlank = value => {
  return (!(value instanceof Date)) && (
    (value === null) ||
    (value === undefined) ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.every(isBlank)) ||
    (typeof value === 'object') && Object.values(value).every(isBlank)
  )
}