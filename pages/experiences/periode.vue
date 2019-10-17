<template>
  <div class="form">

    <div class="form-fields">

        <!-- <div class="field">
          <label class="label">Durée totale exprimée en heures</label>
          <div class="control">
            <input ref="avril__name" class="input" type="number" placeholder="Exemple : 1300" @input="addDuree">
          </div>
        </div> -->

        <div class="field natural-language">
          <span class="title is-5">
            J'ai travaillé pendant
          </span>
          <span class="select years">
            <select @change="onYearsChange($event)" v-model="selectedYear">

              <option value="month">un mois ou moins</option>
              <!-- On va ensuite lui demander combien de mois -->

              <option value="months">plusieurs mois</option>
              <!-- On lui demande aussi combien de mois -->

              <option value="46">1 année</option>
              <option value="92">2 années</option>
              <option value="138">3 années</option>

              <option value="more">plus de 3 années</option>
              <!-- On lui demande combien d'années -->

            </select>
          </span>
          <span class="title is-5">
            à
          </span>
          <span class="select hours">
            <select @change="onHoursChange($event)" v-model="selectedHours">
              <option value="35">35 heures</option>
              <option value="35+">plus de 35 heures</option>
              <option value="25-34">entre 25 et 34 heures</option>
              <option value="15-24">entre 15 et 24 heures</option>
              <option value="15">moins de 15 heures</option>
            </select>
          </span>
          <span class="title is-5">
            par semaine, sur
          </span>
          <span class="select semaines">
            <select @change="onSemaineChange($event)" v-model="selectedSemaines">
              <option value="46-">moins de 46 semaines</option>
              <option value="46">46 semaines</option>
              <option value="46+">plus de 46 semaines</option>
            </select>
          </span>

        </div>

        <div class="field" v-if="displaySemaineFront">
          <label class="label">Pendant combien de semaines avez-vous travaillé ?</label>
          <input ref="" class="input" type="number" @input="calculateTimeBySemaine">
        </div>

        <div class="field" v-if="displayMonthsFront">
          <label class="label">Pendant combien de mois avez-vous travaillé ?</label>
          <input ref="" class="input" type="number" @input="calculateTimeByMonth">
        </div>

        <div class="field" v-if="displayYearFront">
          <label class="label">Pendant combien d'années avez-vous travaillé ?</label>
          <input ref="" class="input" type="number" @input="calculateTimeByYear">
        </div>

        <div class="field" v-if="displayHoursFront">
          <label class="label">A combien d'heures par semaine ?</label>
          <input ref="" class="input" type="number" @input="calculateTimeByHours">
        </div>

        <div class="field">
          <label class="label">Sur quelle période ?</label>
          <date-picker v-model="time3" range lang="fr" format="DD/MM/YYYY" confirm></date-picker>
        </div>

        <div class="field">
          <div class="control">
            <nuxt-link to="precision" class="is-ok button is-text is-pulled-left">
              Remplir plus tard
            </nuxt-link>
            <nuxt-link to="precision" class="is-ok button is-dark is-pulled-right">
              Continuer
            </nuxt-link>
          </div>
        </div>

      </div>

      <div class="form-help">
        <h3 class="title is-4">Besoin d'aide ?</h3>
        <div class="form-help-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <p style="margin-top:1rem">
          <a href="#" class="is-text">J'ai besoin de plus d'aide</a>
        </p>
      </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

// import Logo from '~/components/Logo.vue'
// const ioHook = require('iohook');
export default {
  layout: 'experience',
  components: { DatePicker },
  data() {
    return {
      lang: {
        days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        months: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['7 jours suivants', '30 jours suivants', '7 jours précédents', '30 jours précédents'],
        placeholder: {
          date: 'Sélectionnez une date',
          dateRange: 'Sélectionnez une période'
        }
      },
      time3: '',
      semaine: 46,
      hours: 35,
      selectedYear: 46,
      selectedSemaines: 46,
      selectedHours: 35,
      displaySemaine: false,
      displaySemaines: false,
      displayMonth: false,
      displayYear: false,
      displayHours: false,
    }
  },
  computed: {
    heures () {
      return this.$store.state.experiences.heures
    },
    pourcentage () {
      if( (this.$store.state.experiences.heures*100)/1607 > 100 )
        return 100
      else
        return (this.$store.state.experiences.heures*100)/1607
    },
    displaySemaineFront () {
      if( this.displaySemaine ) return true
    },
    displayMonthsFront () {
      if( this.displayMonth ) return true
    },
    displayYearFront () {
      if( this.displayYear ) return true
    },
    displayHoursFront () {
      if( this.displayHours ) return true
    }
  },
  watch: {
    time3(e) {
      this.addPeriode(e)
    }
  },
  created() {
    // console.log('accueil created')
  },

  mounted() {
    // this.$refs.avril__name.focus()
  },
  methods: {
    keymonitor: function(event) {
      // console.log(event.key);
      if(event.key == "Enter")
      {
        console.log("enter key was pressed!");
        // this.$router.push('/name')
        this.$router.push('precision')
      }
    },
    addPeriode (e) {
      this.$store.commit('experiences/addPeriode', e)
    },
    addDuree (e) {
      this.$store.commit('experiences/addDuree', e)
    },
    calculateTime (hours = this.hours, semaine = this.semaine) {
      let total = hours * semaine;
      this.addDuree(total)
    },
    calculateTimeBySemaine (e) {
      this.semaine = parseInt(e.target.value)
      let total = this.semaine * this.hours;
      this.addDuree(total)
      this.semaine = parseInt(e.target.value);
    },
    calculateTimeByYear (e) {
      this.semaine = parseInt(e.target.value) * ( 46 )
      let total = this.semaine * this.hours;
      this.addDuree(total)
      this.semaine = 46;
    },
    calculateTimeByMonth (e) {
      this.semaine = parseInt(e.target.value) * ( 4 )
      let total = this.semaine * this.hours;
      this.addDuree(total)
      this.semaine = 46;
    },
    calculateTimeByHours (e) {
      this.hours = parseInt(e.target.value)
      let total = this.semaine * this.hours;
      this.addDuree(total)
      this.hours = 35;
    },
    onYearsChange (e) {

      e.target.parentElement.style.width = (e.target.options[e.target.selectedIndex].text.length * 16)+"px"
      let valeur = e.target.value;
      // particularity management
      this.displaySemaine = false;
      this.displayMonth = false;
      this.displayYear = false;
      if( valeur == 'month' ) this.displaySemaine = true;
      if( valeur == 'months') this.displayMonth = true;
      if( valeur == 'more') this.displayYear = true;

    },
    onHoursChange (e) {

      e.target.parentElement.style.width = (e.target.options[e.target.selectedIndex].text.length * 16)+"px"
      let valeur = e.target.value;
      // particularity management
      this.displayHours = false;
      if( valeur != '35') this.displayHours = true;

    },
    onSemaineChange (e) {

      e.target.parentElement.style.width = (e.target.options[e.target.selectedIndex].text.length * 16)+"px"
      let valeur = e.target.value;
      // particularity management
      this.displaySemaine = false;
      if( valeur == '46-') this.displaySemaine = true;
      if( valeur == '46+') this.displaySemaine = true;

    },
  }
}
</script>

<style>
.mx-datepicker-range {
  width: 100%;
}
</style>
