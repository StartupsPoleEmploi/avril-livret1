<template>
  <div class="form">

    <div class="form-fields">

      <div class="field">
        <h3 class="title is-5">Quels diplômes avez-vous obtenu en rapport avec {{currentDegree}} ?</h3>
      </div>

      <div class="field">
        <div class="control">
          <input class="input" ref="avril__name" type="text" placeholder="Exemple : Bac pro commerce" @keyup.enter="addRelatedDegree">
          <a class="button is-dark is-pulled-right" @click="addRelatedDegree" style="margin-top:4px">
            + Ajouter
          </a>
          <div class="push-enter is-pulled-right" style="margin-top:5px; margin-left:6px;">
            Pour ajouter, appuyez sur <strong>Entrée</strong> ou
          </div>
        </div>
      </div>

      <div class="field">
        <div class="titres">
          <div v-for="relatedDegree in relatedDegrees">
            <span class="box">{{relatedDegree}}</span>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <nuxt-link v-if="displayNextButton" to="formations" class="is-ok button is-default is-pulled-right">
            Continuer
          </nuxt-link>
          <nuxt-link v-else to="formations" class="is-ok button is-default is-pulled-right">
            Aucun, continuer
          </nuxt-link>
          <nuxt-link to="formations" class="is-ok button is-text is-pulled-left">
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
    relatedDegrees() {
      // let act = _.cloneDeep(this.$store.state.education.relatedDegrees)
      // return act.reverse()
    },
    currentDegree() {
      return this.$store.state.currentDegree;
    },
    displayNextButton() {
      return this.$store.state.education.relatedDegrees.length;
    },
  },
  mounted() {
  },
  methods: {
    addRelatedDegree (e) {
      if( this.$refs.avril__name.value == '' || this.$refs.avril__name.value == ' ' ){
        return false;
      }
      this.$store.commit('education/addRelatedDegree', this.$refs.avril__name.value)
      this.$refs.avril__name.value = ''
    },
  }
}
</script>

<style>
.titres {
    /* margin-top: 4rem; */
}
</style>
