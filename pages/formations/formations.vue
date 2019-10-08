<template>
  <div class="form">

    <div class="form-fields">

        <h3 class="title is-5">Indiquez les éventuelles formations courtes suivies dans le cadre de la formation continue (stage, certification,...), en relation avec la certification visée</h3>

        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="Exemple : CACES, BTS MUC" @input="addFormations"></textarea>
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// const ioHook = require('iohook');
export default {
  layout: 'experience',
  mounted() {
    this.$store.commit('experiences/addRemplissage', 90)
    this.$store.commit('experiences/enableFormationStepper')
  },
  methods: {
    addFormations (e) {
      this.$store.commit('experiences/enableMonDossier')
      this.$store.commit('experiences/addFormations', e.target.value)
    },
  }
}
</script>

<style>

</style>
