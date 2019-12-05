import moment from 'moment';

export const periodTotalHours = period => {
  // TODO: supprimer les weekends du calcul des heures totales
  // par mois, le coeficcient de gain de congé est de 14 :
  // exemple, à 35h / 14 = 2,5 jours par mois de congé
  // exemple, à 10h / 14 = 0,71 jours par mois
  const startMoment = moment(period.start);
  const endMoment = period.end ? moment(period.end) : moment().startOf('day');
  const dailyHours = parseInt(period.weekHours)/5;
  const weekends = (endMoment.diff(startMoment, 'days') / 7)*2;
  const workedDays = endMoment.diff(startMoment, 'days') - weekends;
  return parseInt(dailyHours * workedDays)
}