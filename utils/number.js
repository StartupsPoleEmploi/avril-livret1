export const percent = value => {
  return Math.round(Math.min(Math.max(0, value), 1) * 100);
}