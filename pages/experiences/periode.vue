<template>
  <div class="form">
    <div class="form-fields">

      <div class="field natural-language">
        <span class="title is-5">
          J'ai travaillé du <date-picker v-model="premierePeriode" lang="fr" format="DD/MM/YYYY" confirm></date-picker> au
          <date-picker v-model="secondePeriode" lang="fr" format="DD/MM/YYYY" confirm></date-picker> à <input class="input heure" type="number" v-model="heurePeriode" value="35"> h par semaine.
        </span>
        <div class="">
          <a class="button is-dark" @click="addPeriods" style="margin-top:1rem">
            + Ajouter cette période
          </a>
        </div>
      </div>

      <div class="columns is-multiline">
        <div v-for="period in periods" class="column is-half">
          <div class="box is-equal-height">
            <p class="title is-3">{{ Math.round(period.totalHeures) }} heures</p>
            <h3 class="title is-6">Du {{ $moment(period.de) }}</h3>
            <h3 class="title is-6">au {{ $moment(period.a) }}</h3>
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
          <nuxt-link to="precision" class="is-ok button is-default is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>

    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import moment from 'moment';

import helpLoaderMixin from '~/mixins/helpLoader.js';

export default {
  mixins: [helpLoaderMixin],
  components: {
    DatePicker
  },
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
    periods () {
      return this.$store.state.experiences[this.$store.state.experiences.length - 1].periods
    },
  },
  watch: {
    time3(e) {
      this.addPeriod(e)
    }
  },
  created() {
  },

  mounted() {
    // this.$refs.avril__name.focus()
  },
  methods: {
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        console.log("enter key was pressed!");
        this.$router.push('precision')
      }
    },
    addPeriods () {
      console.log('add periodes')
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

      let joursTravailles = b.diff(a, 'days') - weekends;

      let heuresTravailles = hJour * joursTravailles;

      let totalHeures = heuresTravailles;

      periode.totalHeures = totalHeures;

      this.$store.commit('experiences/addPeriods', periode)
      console.log('je tente d\'ajouter', periode.totalHeures, 'heures')
      this.$store.commit('experiences/addHours', periode.totalHeures)
      console.log(this.$store.state.experiences.hours, 'heures dans le store')

      this.premierePeriode = '';
      this.secondePeriode = '';
      this.heurePeriode = '';
    },
    addPeriod (e) {
      this.$store.commit('experiences/addPeriod', e)
    },
  }
}
</script>

<style>
.mx-datepicker-range {
  width: 100%;
}
</style>
