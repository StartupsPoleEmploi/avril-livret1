<template>
  <div class="form">

    <div class="form-fields">
        <h3 class="title is-5">Avez-vous une ou plusieurs partie(s) de certification professionnelle ?</h3>
        <div class="columns">
          <div class="column">
            <nuxt-link v-on:click.native="addCertification('A')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;Oui
            </nuxt-link>
          </div>
          <div class="column">
            <nuxt-link v-on:click.native="addCertification('B')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;Non
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
    this.$store.commit('experiences/addRemplissage', 53)
  },
  methods: {
    addCertification (e) {
      this.$store.commit('experiences/addCertification', e)
    },
  }
}
</script>

<style>

</style>
