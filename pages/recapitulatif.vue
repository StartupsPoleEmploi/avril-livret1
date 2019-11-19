<template>
  <div class="avril-recapitulatif">

      <div class="recap-content">

        <div class="section">
          <h1 class="title is-1">Récapitulatif</h1>

          <div class="notification is-avril">
            <p>Vérifiez que toutes ces informations sont correctes. Si besoin corrigez-les.</p>
            <p>Si tout vous semble correcte, enregistrez votre livret 1 dans votre dossier VAE Avril.</p>
          </div>
        </div>


        <section class="section section-formation">
          <h1 class="title is-3">Ma formation</h1>
          <RecapClasse/>
          <RecapDiplome/>
          <RecapTitres/>
          <RecapFormations/>
        </section>

        <section class="section section-formation">
          <h3 class="title is-3">Mes expériences professionnelles</h3>
          <p v-if="experiencesProgress == 100">J'ai plus de 1607 heures d'expériences professionnelles</p>
          <div class="columns is-multiline">
            <div v-for="experience in experiences" class="column is-4">
              <div class="box is-equal-height">
                <h3 class="title is-4">{{ experience.role }}</h3>
                <h3 class="title is-6">{{ experience.hours }} heures</h3>
                <p>{{ experience.companyName }}</p>
                <span>{{ experience.periods }}</span>
                <a href="#">éditer</a>
              </div>
            </div>
          </div>
        </section>

        <section class="section section-identite">
          <h3 class="title is-3">Mon identité</h3>
          <RecapName/>
          <RecapContact/>
          <RecapBirthday/>
          <RecapResidence/>
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

import RecapName from '~/components/recapitulatif/RecapName.vue';
import RecapContact from '~/components/recapitulatif/RecapContact.vue';
import RecapBirthday from '~/components/recapitulatif/RecapBirthday.vue';
import RecapResidence from '~/components/recapitulatif/RecapResidence.vue';

export default {
  components:{
    RecapClasse,
    RecapDiplome,
    RecapTitres,
    RecapFormations,
    RecapName,
    RecapContact,
    RecapBirthday,
    RecapResidence,
  },
  layout: 'recapitulatif',
  computed: {
    experiences () {
      return this.$store.state.experiences
    },
    experiencesProgress () {
      return this.$store.getters['experiences/progress'];
    },
  },
  methods: {
  }
}
</script>

<style scoped>
.avril-recapitulatif{
  padding: 4rem;
  padding-top: 2rem;
}
</style>
