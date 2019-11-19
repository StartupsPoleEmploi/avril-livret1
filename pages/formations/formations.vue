<template>
  <div class="form">

    <div class="form-fields">

      <div class="field">
        <h3 class="title is-5">Si vous avez suivi des formations courtes, effectué des stages ou obtenu des habilitations, indiquez les.</h3>
      </div>

      <div class="field">
        <div class="control">
          <input class="input" ref="avril__name" type="text" placeholder="Exemple : CACES, 1er secours, permis B, Fimo" @keyup.enter="addTraining">
          <a class="button is-dark is-pulled-right" @click="addTraining" style="margin-top:4px">
            + Ajouter
          </a>
          <div class="push-enter is-pulled-right" style="margin-top:5px; margin-left:6px;">
            Pour ajouter, appuyez sur <strong>Entrée</strong> ou
          </div>
        </div>
      </div>

      <div class="field">
        <div class="formations">
          <div v-for="training in trainings">
            <span class="box">{{training}}</span>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <nuxt-link v-if="displayNextButton" to="/experiences" class="is-ok button is-default is-pulled-right">
            Continuer
          </nuxt-link>
          <nuxt-link v-else to="/experiences" class="is-ok button is-default is-pulled-right">
            Aucun, continuer
          </nuxt-link>
          <nuxt-link to="/experiences" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
        </div>
      </div>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import helpLoaderMixin from '~/mixins/helpLoader.js';

export default {
  mixins: [helpLoaderMixin],
  computed: {
    trainings () {
      // let act = _.cloneDeep(this.$store.state.education.trainings)
      // return act.reverse()
    },
    displayNextButton () {
      return this.$store.state.education.trainings.length;
    },
  },
  methods: {
    addTraining (e) {
      if( this.$refs.avril__name.value == '' || this.$refs.avril__name.value == ' ' ){
        return false;
      }
      this.$store.commit('education/addTraining', this.$refs.avril__name.value)
      this.$refs.avril__name.value = ''
    },
  }
}
</script>

<style>
</style>
