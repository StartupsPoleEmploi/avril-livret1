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
          <ul v-for="training in trainings">
            <li class="box">
              {{training}}
              <button @click="removeTraining(training)" class="delete is-pulled-right"></button>
            </li>
          </ul>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <nuxt-link to="/experiences" class="is-ok button is-default is-pulled-right">
            {{trainings.length ? 'Continuer' : 'Aucun, continuer'}}
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
      return this.$store.state.education.trainings;
    },
  },
  methods: {
    addTraining(e) {
      if( this.$refs.avril__name.value == '' || this.$refs.avril__name.value == ' ' ){
        return false;
      }
      this.$store.commit('education/addTraining', this.$refs.avril__name.value)
      this.$refs.avril__name.value = ''
    },
    removeTraining(value) {
      this.$store.commit('education/removeTraining', value)
    }
  }
}
</script>

<style>
</style>
