<template>

  <div class="form">

    <div class="form-fields">

        <h3 class="title is-5">Statut au moment où vous avez exercé votre activité</h3>

        <nuxt-link v-on:click.native="addStatus('A')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;Salarié
        </nuxt-link>
        <nuxt-link v-on:click.native="addStatus('B')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;Travailleur indépendant, artisan, profession libérale
        </nuxt-link>
        <nuxt-link v-on:click.native="addStatus('C')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;Volontaire
        </nuxt-link>
        <nuxt-link v-on:click.native="addStatus('D')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;Sportif de haut niveau
        </nuxt-link>

        <nuxt-link v-on:click.native="addStatus('E')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;Bénévole
        </nuxt-link>
        <nuxt-link v-on:click.native="addStatus('F')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;Personne ayant exercé des responsabilités syndicales
        </nuxt-link>
        <nuxt-link v-on:click.native="addStatus('G')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;Mandat électoral local ou fonction élective locale
        </nuxt-link>
        <nuxt-link v-on:click.native="addStatus('H')" to="periode" class="box">
          <input type="radio" name="answer"> &nbsp;En contrat d’apprentissage
        </nuxt-link>

      </div>


      <div class="form-help">
        <div class="form-help-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
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

  },
  methods: {
    keymonitor: function(event) {
      console.log(event.key);
      if(event.key == "Enter")
      {
        console.log("enter key was pressed!");
        // this.$router.push('/name')
        this.$router.push('name')
      }
    },
    addStatus (e) {
      this.$store.commit('experiences/addStatus', e)
    },
  }
}
</script>

<style>

</style>
