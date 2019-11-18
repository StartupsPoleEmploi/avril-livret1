export const isBlank = value => {
  return (value === false) ||
    (value === null) ||
    (value === undefined) ||
    (value === 0) ||
    (value === '') ||
    (Array.isArray(value) && value.length === 0);
}