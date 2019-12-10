import differenceInBusinessDays from 'date-fns/differenceInBusinessDays'
import {format} from 'date-fns';

export const periodTotalHours = period => {
  const dailyHours = parseInt(period.weekHours)/5;
  const workedDays = differenceInBusinessDays(period.end || new Date(), period.start)
  return parseInt(dailyHours * workedDays)
}

export const formatDate = date => format(date, 'dd/MM/yyyy')