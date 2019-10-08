<template>
  <div class="form">

    <div class="form-fields">

        <div class="field">
          <label class="label">Activités exercées en rapport direct avec la certification visée</label>
          <!-- <div class="control">
            <textarea ref="avril__name" class="textarea" placeholder="Exemple : Pétrissage de pâte à pain, fabrication de chocolatine, ..." @input="addPrecision"></textarea>
          </div> -->
          <div class="control">
            <input class="input" ref="avril__name" type="text" placeholder="Exemple : Pétrissage du pain" @keyup.enter="addActivite">
            <div class="push-enter is-pulled-right">
              Appuyez sur <strong>Entrée</strong> pour ajouter cette activité
            </div>
          </div>
          <div class="activites">
            <div v-for="activite in activites">
              <span class="box">{{activite}}</span>
            </div>
          </div>

        </div>

        <div class="field">
          <div class="control">
            <nuxt-link to="/experiences" class="is-ok button is-dark is-rounded is-pulled-right">
              Enregistrer cette expérience
            </nuxt-link>
          </div>
        </div>

      </div>


      <div class="form-help">
        <div class="progress-vision">
          <div class="progress__bar --hours"><div class="progress__bar--suivi" :style="`width:${pourcentage}%`"></div></div>
          <p v-if="heures < 1607">Il vous manque <strong>{{1607 - heures}}</strong> heure<span v-if="(1607 - heures) > 0">s</span>.</p>
          <p v-if="heures >= 1607">Vous avez renseigné <strong>{{heures}}</strong> heure<span v-if="heures > 0">s</span>.</p>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
  layout: 'experience',
  components: {},
  computed: {
    activites () {
      let act = _.cloneDeep(this.$store.state.experiences.activites)
      return act.reverse()
    },
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
    this.$store.commit('experiences/addHours')
  },

  mounted() {
    this.$refs.avril__name.focus()
    this.$store.commit('experiences/disableFormationStepper')
  },
  methods: {
    addPrecision (e) {
      this.$store.commit('experiences/addPrecision', e.target.value)
    },
    addActivite (e) {
      this.$store.commit('experiences/addActivite', e.target.value)
      this.$refs.avril__name.value = ''
    },
  }
}
</script>

<style>
.activites{
  margin-top: 4rem;
}
.box{
  margin-top: 1rem;
}
.mx-datepicker-range {
  width: 100%;
}
</style>
