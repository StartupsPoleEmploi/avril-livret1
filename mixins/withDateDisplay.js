import moment from 'moment';

export default {
  data: () => ({
    dateFormat: 'DD/MM/YYYY',
  }),
  methods: {
    formatDate(date) {
      return moment(date).format(this.dateFormat);
    },
  }
}