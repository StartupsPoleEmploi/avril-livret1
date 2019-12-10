import differenceInBusinessDays from 'date-fns/differenceInBusinessDays'
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const periodTotalHours = period => {
  const dailyHours = parseInt(period.weekHours)/5;
  const workedDays = differenceInBusinessDays(period.end || new Date(), period.start)
  return parseInt(dailyHours * workedDays)
}

export const formatDate = date => {
  return format(date, 'dd/MM/yyyy');
}

export const parseDate = date => {
  if (date) {
    return parseISO(date);
  }
}