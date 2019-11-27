import DatePicker from 'vue2-datepicker';

export default {
  components: {
    DatePicker,
  },
  data: () => ({
    dateFormat: 'DD/MM/YYYY',
    lang: {
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      pickers: ['7 jours suivants', '30 jours suivants', '7 jours précédents', '30 jours précédents'],
      placeholder: {
        date: 'Sélectionnez une date',
        dateRange: 'Sélectionnez une période'
      }
    },
  })
}