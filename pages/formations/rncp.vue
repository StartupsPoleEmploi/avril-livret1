<template>
  <div class="form">

    <div class="form-fields">

      <div class="field">
        <label class="label">Si vous possédez une certification ou partie/s de certification professionnelle inscrite/s au Répertoire National des Certifications Professionnelles (RNCP) en rapport avec la certification professionnelle que vous souhaitez obtenir par la validation des acquis de l'expérience (VAE), indiquez son ou leur/s intitulé/s exact/s</label>
      </div>

      <div class="field has-addons">
        <div class="control">
          <input class="input" ref="avril__name" type="text" placeholder="Exemple : Bac pro commerce" @keyup.enter="addTitre">
          <div class="push-enter is-pulled-right">
            Appuyez sur <strong>Entrée</strong> pour ajouter ce titre
          </div>
        </div>
        <div class="control">
          <a class="button is-default is-large" @click="addTitre">
            +
          </a>
        </div>
      </div>

      <div class="field">
        <div class="titres">
          <div v-for="titre in titres">
            <span class="box">{{titre}}</span>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <nuxt-link to="formations" class="is-ok button is-dark is-rounded is-pulled-right">
            Continuer : Formations
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
  components: {
    // Logo
  },
  computed: {
    titres () {
      let act = _.cloneDeep(this.$store.state.experiences.titres)
      return act.reverse()
    },
  },
  mounted() {
    this.$store.commit('experiences/addRemplissage', 80)
  },
  methods: {
    addRNCP (e) {
      this.$store.commit('experiences/addRNCP', e.target.value)
    },
    addTitre (e) {
      this.$store.commit('experiences/addTitre', this.$refs.avril__name.value)
      this.$refs.avril__name.value = ''
    },
  }
}
</script>

<style>
.titres {
    margin-top: 4rem;
}
</style>
