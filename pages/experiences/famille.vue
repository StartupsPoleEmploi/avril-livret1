<template>
  <div class="form">

    <div class="form-fields">

        <h3 class="title is-5">Famille professionnelle de l'emploi</h3>

            <nuxt-link v-on:click.native="addFamille('A')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Agriculture, marine, pêche
            </nuxt-link>
            <nuxt-link v-on:click.native="addFamille('B')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Bâtiment, travaux publics
            </nuxt-link>
            <nuxt-link v-on:click.native="addFamille('C')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Electricité, électronique
            </nuxt-link>
            <nuxt-link v-on:click.native="addFamille('D')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Mécanique, travail des métaux
            </nuxt-link>

            <nuxt-link v-on:click.native="addFamille('E')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Industries de process
            </nuxt-link>
            <nuxt-link v-on:click.native="addFamille('F')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Maintenance
            </nuxt-link>
            <nuxt-link v-on:click.native="addFamille('G')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Ingénieurs et cadres de l'industrie
            </nuxt-link>
            <nuxt-link v-on:click.native="addFamille('H')" to="status" class="box">
              <input type="radio" name="answer"> &nbsp;Transports, logistique et tourisme
            </nuxt-link>



      </div>
      <div class="form-help">
        <div class="progress-vision">
          <div class="progress__bar --hours"><div class="progress__bar--suivi" :style="`width:${pourcentage}%`"></div></div>
          <p v-if="heures < 1607">Il vous reste <strong>{{1607 - heures}}</strong> heure<span v-if="(1607 - heures) > 0">s</span>.</p>
          <p v-if="heures >= 1607">Vous avez renseigné <strong>{{heures}}</strong> heure<span v-if="heures > 0">s</span>.</p>
        </div>
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
    addFamille (e) {
      this.$store.commit('experiences/addFamille', e)
    },
  }
}
</script>

<style>

</style>
