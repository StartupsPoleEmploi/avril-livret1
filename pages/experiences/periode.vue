<template>
  <div class="form">

    <div class="form-fields">

        <div class="field natural-language">
          <span class="title is-5">
            J'ai travaillé du <date-picker v-model="premierePeriode" lang="fr" format="DD/MM/YYYY" confirm></date-picker> au
            <date-picker v-model="secondePeriode" lang="fr" format="DD/MM/YYYY" confirm></date-picker> à <input class="input heure" type="number" v-model="heurePeriode" value="35"> heures par semaine.
          </span>
          <div class="">
            <a class="button is-default" @click="addPeriodes" style="margin-top:1rem">
              + Ajouter cette période
            </a>
          </div>
        </div>

        <div class="columns is-multiline">
          <div v-for="periode in periodes" class="column is-half">
            <div class="box is-equal-height">
              <p class="title is-3">{{ Math.round(periode.totalHeures) }} heures</p>
              <h3 class="title is-6">Du {{ $moment(periode.de) }}</h3>
              <h3 class="title is-6">au {{ $moment(periode.a) }}</h3>
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="avril__box__experience is-equal-height">
            </div>
          </div>
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
import moment from 'moment';

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
      premierePeriode: '',
      secondePeriode: '',
      heurePeriode: '',
      semaine: 46,
      hours: 35,
      selectedYear: 46,
      selectedSemaines: 46,
      selectedHours: 35,
    }
  },
  computed: {
    heures () {
      return this.$store.state.experiences.heures
    },
    periodes () {
      return this.$store.state.experiences.periodes
    },
    pourcentage () {
      if( (this.$store.state.experiences.heures*100)/1607 > 100 )
        return 100
      else
        return (this.$store.state.experiences.heures*100)/1607
    },
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
    addPeriodes () {
      // TODO: supprimer les weekends du calcul des heures totales

      // par mois, le coeficcient de gain de congé est de 14 :
      // exemple, à 35h / 14 = 2,5 jours par mois de congé
      // exemple, à 10h / 14 = 0,71 jours par mois

      let a = moment(this.premierePeriode);
      let b = moment(this.secondePeriode);
      let periode = {
        de: this.premierePeriode,
        a: this.secondePeriode,
        heures: parseInt(this.heurePeriode),
        jours: b.diff(a, 'days'),
        semaines: b.diff(a, 'week')
      };
      let hJour = parseInt(this.heurePeriode)/5; // 35/5
      let weekends = (b.diff(a, 'days') / 7)*2;
      // console.log(weekends);

      let joursTravailles = b.diff(a, 'days') - weekends;
      console.log('jours travaillés', joursTravailles);

      let heuresTravailles = hJour * joursTravailles;
      console.log('heures travaillés', heuresTravailles);

      let totalHeures = heuresTravailles;

      periode.totalHeures = totalHeures;
      console.log(periode);

      this.$store.commit('experiences/addPeriodes', periode)
      this.$store.commit('experiences/addHours', periode.totalHeures)

      this.premierePeriode = '';
      this.secondePeriode = '';
      this.heurePeriode = '';
    },
    addPeriode (e) {
      this.$store.commit('experiences/addPeriode', e)
    },
    addDuree (e) {
      this.$store.commit('experiences/addDuree', e)
    },
    // onYearsChange (e) {
    //
    //   e.target.parentElement.style.width = (e.target.options[e.target.selectedIndex].text.length * 16)+"px"
    //   let valeur = e.target.value;
    //   // particularity management
    //   this.displaySemaine = false;
    //   this.displayMonth = false;
    //   this.displayYear = false;
    //   if( valeur == 'month' ) this.displaySemaine = true;
    //   if( valeur == 'months') this.displayMonth = true;
    //   if( valeur == 'more') this.displayYear = true;
    //
    // },
    // onHoursChange (e) {
    //
    //   e.target.parentElement.style.width = (e.target.options[e.target.selectedIndex].text.length * 16)+"px"
    //   let valeur = e.target.value;
    //   // particularity management
    //   this.displayHours = false;
    //   if( valeur != '35') this.displayHours = true;
    //
    // },
    // onSemaineChange (e) {
    //
    //   e.target.parentElement.style.width = (e.target.options[e.target.selectedIndex].text.length * 16)+"px"
    //   let valeur = e.target.value;
    //   // particularity management
    //   this.displaySemaine = false;
    //   if( valeur == '46-') this.displaySemaine = true;
    //   if( valeur == '46+') this.displaySemaine = true;
    //
    // },
  }
}
</script>

<style>
.mx-datepicker-range {
  width: 100%;
}
</style>
