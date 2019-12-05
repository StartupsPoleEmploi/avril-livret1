<template>
  <div class="form">

    <div class="form-fields">

      <div class="field">
        <h3 class="title is-5">Si vous avez suivi des formations courtes, effectué des stages ou obtenu des habilitations, indiquez les.</h3>
      </div>

      <div class="field">
        <div class="control">
          <input class="input" ref="avril__name" type="text" placeholder="Ex: CACES, TOEIC, permis B, FIMO" @keyup.enter="addTraining">
          <div class="has-text-right" style="margin-top:5px;">
            Pour ajouter, appuyez sur <strong>Entrée</strong> ou
            <button class="button" :class="trainings.length ? 'is-default' : 'is-dark'" @click="addTraining" style="margin-top:4px">
              + Ajouter
            </button>
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
          <nuxt-link to="/experiences" class="is-ok button is-pulled-right" :class="trainings.length ? 'is-dark' : 'is-default'">
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
