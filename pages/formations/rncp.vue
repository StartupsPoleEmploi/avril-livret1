<template>
  <div class="form">

    <div class="form-fields">

        <h3 class="title is-6">Si vous possédez une certification ou partie/s de certification professionnelle inscrite/s au Répertoire National des Certifications Professionnelles (RNCP) en rapport avec la certification professionnelle que vous souhaitez obtenir par la validation des acquis de l'expérience (VAE), indiquez son ou leur/s intitulé/s exact/s</h3>

        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="Exemple : Bac pro commerce, TP ADVF" @input="addRNCP"></textarea>
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// const ioHook = require('iohook');
export default {
  layout: 'experience',
  components: {
    // Logo
  },
  computed: {

  },

  created() {
    // console.log('accueil created')
  },

  mounted() {
    this.$store.commit('experiences/addRemplissage', 80)
  },
  methods: {
    addRNCP (e) {
      this.$store.commit('experiences/addRNCP', e.target.value)
    },
  }
}
</script>

<style>

</style>
