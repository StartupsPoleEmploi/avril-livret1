import differenceInBusinessDays from 'date-fns/differenceInBusinessDays'
import parseISO from 'date-fns/parseISO';
import formatISO from 'date-fns/formatISO';
import format from 'date-fns/format';

export const periodTotalHours = period => {
  const dailyHours = parseInt(period.weekHours)/5;
  const workedDays = differenceInBusinessDays(period.end || new Date(), period.start)
  return parseInt(dailyHours * workedDays)
}

export const formatDate = date => {
  if (date) {
    return format(date, 'dd/MM/yyyy');
  }
}

export const formatISODate = (date, representation='date') => {
  if (date) {
    return formatISO(date, {representation});
  }
}

export const parseISODate = date => {
  if (date) {
    return parseISO(date);
  }
}