<template>
  <div class="avril-recapitulatif">

      <div class="recap-content">
        <div class="notification is-avril">
          <button class="delete"></button>
          <p>Vérifiez que toutes ces informations soient correctes. Si besoin corrigez-les.</p>
          <p>Si tout vous semble correcte, enregistrez votre livret 1 dans votre dossier VAE Avril.</p>
        </div>

        <h1 class="title is-1">Ma formation</h1>

        <section class="section-formation">

          <RecapClasse/>
          <RecapDiplome/>
          <RecapTitres/>
          <RecapFormations/>

        </section>

      </div>


      <div class="field">
        <h3 class="title is-3">Est-ce que toutes ces informations sont exactes ?</h3>
        <div class="control">
          <nuxt-link to="/" class="is-ok button is-dark">
            Oui
          </nuxt-link>
        </div>
      </div>

  </div>
</template>

<script>
import RecapClasse from '~/components/recapitulatif/RecapClasse.vue';
import RecapDiplome from '~/components/recapitulatif/RecapDiplome.vue';
import RecapTitres from '~/components/recapitulatif/RecapTitres.vue';
import RecapFormations from '~/components/recapitulatif/RecapFormations.vue';

export default {
  components:{
    RecapClasse,
    RecapDiplome,
    RecapTitres,
    RecapFormations,
  },
  layout: 'recapitulatif',
  computed: {
    experiences () {
      return this.$store.state.experiences
    },
  },
  mounted() {
    // console.log(this.$store.state.experiences)
  },
  methods: {
  }
}
</script>

<style>
</style>
