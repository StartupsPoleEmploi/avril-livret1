<template>
  <div class="avril__page">
    <div class="avril__page__form">
      <div class="avril__page__form--container">

        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input ref="avril__name" class="input" v-on:keyup="keymonitor" type="text" placeholder="Text input">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <nuxt-link to="name" class="is-ok button is-dark is-rounded is-small is-pulled-right">
              Name
            </nuxt-link>
            <div class=" is-pulled-right">
              Appuyez sur <strong>Entrée</strong> ou
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="avril__page__help">
      <div class="progress-vision">
        <div class="progress__bar --hours"><div class="progress__bar--suivi" :style="`width:${pourcentage}%`"></div></div>
        <p v-if="heures < 1607">Il vous manque <strong>{{1607 - heures}}</strong> heure<span v-if="(1607 - heures) > 0">s</span>.</p>
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
    this.$refs.avril__name.focus()
  },
  methods: {
    keymonitor: function(event) {
      console.log(event.key);
      if(event.key == "Enter" || event.key == "Tab")
      {
        console.log("enter key was pressed!");
        // this.$router.push('/name')
        this.$router.push('name')
      }
    }
  }
}
</script>

<style>

</style>
