export const labelGetter = (array, value) => {
  const answer =array.find(a => a.value === value)
    if (answer) return answer.label;
}