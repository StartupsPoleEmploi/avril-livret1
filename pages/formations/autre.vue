<template>
  <div class="form">

    <div class="form-fields">
      <h3 class="title is-5">Avez-vous une ou plusieurs partie(s) de certification professionnelle ?</h3>
      <div class="columns">
        <div class="column">
          <nuxt-link v-on:click.native="addCertification('oui')" to="rncp" class="box">
            <input type="radio" name="answer"> &nbsp;Oui
          </nuxt-link>
        </div>
        <div class="column">
          <nuxt-link v-on:click.native="addCertification('non')" to="rncp" class="box">
            <input type="radio" name="answer"> &nbsp;Non
          </nuxt-link>
        </div>
      </div>

      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link to="rncp" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
        </div>
      </div>

    </div>


    <div class="form-help">
      <h3 class="title is-4">Besoin d'aide ?</h3>
      <div class="form-help-content">
Sélectionnez la bonne case. Dites nous simplement quel est le dernier diplôme que vous avez obtenu. Ne vous inquiétez pas, il s'agit d'une simple information, cela ne sert pas à évaluer votre candidature à la VAE.
Rappelez-vous, la seule condition pour demander votre diplôme en VAE est de justifier d'un an d'expérience.
Et oui, que vous ayez déjà ou non un diplôme, vous pouvez vous lancer dans une démarche de VAE !      </div>
      <p style="margin-top:1rem">
        <a href="#" class="is-text">J'ai besoin de plus d'aide</a>
      </p>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// const ioHook = require('iohook');
export default {
  layout: 'experience',
  mounted() {
    // this.$store.commit('application/addRemplissage', 60)
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
