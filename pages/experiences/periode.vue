<template>
  <div class="form">

    <div class="form-fields">

        <div class="field">
          <label class="label">Durée totale exprimée en heures</label>
          <div class="control">
            <input ref="avril__name" class="input" type="number" placeholder="Exemple : 1300" @input="addDuree">
          </div>
        </div>

        <div class="field">
          <label class="label">Sur quelle période ?</label>
          <date-picker v-model="time3" range :lang="lang"></date-picker>
        </div>

        <div class="field">
          <div class="control">
            <nuxt-link to="precision" class="is-ok button is-dark is-rounded is-pulled-right">
              Continuer : Description des activités
            </nuxt-link>
          </div>
        </div>

      </div>


      <div class="form-help">
        <div class="progress-vision">
          <div class="progress__bar --hours"><div class="progress__bar--suivi" :style="`width:${pourcentage}%`"></div></div>
          <p v-if="heures < 1607">Il vous reste <strong>{{1607 - heures}}</strong> heure<span v-if="(1607 - heures) > 0">s</span>.</p>
          <p v-if="heures >= 1607">Vous avez renseigné <strong>{{heures}}</strong> heure<span v-if="heures > 0">s</span>.</p>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
        pickers: ['7 jours suivants', '30 jours suivanst', '7 jours précédents', '30 jours précédents'],
        placeholder: {
          date: 'Sélectionnez une date',
          dateRange: 'Sélectionnez une période'
        }
      },
      time3: '',
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
    }
  },

  created() {
    // console.log('accueil created')
  },

  mounted() {
    this.$refs.avril__name.focus()
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
      this.$store.commit('experiences/addPeriode', '20-04-2010, 23-07-2018')
    },
    addDuree (e) {
      this.$store.commit('experiences/addDuree', parseInt(e.target.value))
    },
  }
}
</script>

<style>
.mx-datepicker-range {
  width: 100%;
}
</style>
