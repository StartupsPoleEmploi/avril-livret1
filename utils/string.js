export const uuid = () =>  (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

export const pluralize = (first, second) => {
  const number = typeof first === 'number' ? first : second;
  const word = typeof first === 'number' ? second : first;
  return `${number === first ? (number+' ') : ''}${word}${number > 1 ? 's' : ''}`
}