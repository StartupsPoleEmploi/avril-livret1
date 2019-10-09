<template>
  <div class="form">

    <div class="form-fields">

      <div class="field">
        <label class="label">Indiquez les éventuelles formations courtes suivies dans le cadre de la formation continue (stage, certification,...), en relation avec la certification visée</label>
      </div>

      <div class="field has-addons">
        <div class="control">
          <input class="input" ref="avril__name" type="text" placeholder="Exemple : CACES, BTS MUC" @keyup.enter="addFormationsContinues">
          <div class="push-enter is-pulled-right">
            Appuyez sur <strong>Entrée</strong> pour ajouter cette formation continue
          </div>
        </div>
        <div class="control">
          <a class="button is-default is-large" @click="addFormationsContinues">
            +
          </a>
        </div>
      </div>

      <div class="field">
        <div class="formations">
          <div v-for="formationsContinue in formationsContinues">
            <span class="box">{{formationsContinue}}</span>
          </div>
        </div>
      </div>

        <div class="field">
          <div class="control">
            <nuxt-link to="/certification" class="is-ok button is-dark is-rounded is-pulled-right">
              Mon Livret 1
            </nuxt-link>
          </div>
        </div>

      </div>


      <div class="form-help">
        <div class="form-help-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
  layout: 'experience',
  computed: {
    formationsContinues () {
      let act = _.cloneDeep(this.$store.state.experiences.formationsContinues)
      return act.reverse()
    },
  },
  mounted() {
    this.$store.commit('experiences/addRemplissage', 90)
    this.$store.commit('experiences/enableFormationStepper')
  },
  methods: {
    addFormations (e) {
      this.$store.commit('experiences/addFormations', e.target.value)
    },
    addFormationsContinues (e) {
      this.$store.commit('experiences/enableMonDossier')
      this.$store.commit('experiences/addFormationContinue', this.$refs.avril__name.value)
      this.$refs.avril__name.value = ''
    },
  }
}
</script>

<style>
.formations {
    margin-top: 4rem;
}
</style>
