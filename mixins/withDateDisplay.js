import moment from 'moment';

export default {
  data: () => ({
    dateFormat: 'DD/MM/YYYY',
  }),
  methods: {
    formatDate(date) {
      return (date ? moment(date) : moment()).format(this.dateFormat);
    },
  }
}