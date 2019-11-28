import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';


export default {
  components: {
    DatePicker,
  },
  data: () => ({
    dateFormat: 'DD/MM/YYYY',
    placeholder: 'Sélectionnez une date',
  })
}