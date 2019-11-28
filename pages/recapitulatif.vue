<template>
  <div class="avril-recapitulatif">

      <div class="recap-content">

        <div class="section">
          <h1 class="title is-1">Récapitulatif</h1>

          <div class="notification is-avril">
            <p>Vérifiez que toutes ces informations sont correctes. Si besoin corrigez-les en cliquant sur le bouton "Pas encore, poursuivre l'édition" en bas de page.</p>
            <p>Si tout vous semble correct, enregistrez votre livret 1 dans votre dossier VAE Avril.</p>
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
          <p v-if="experiencesProgress == 100">J'ai plus de {{bookletMinHours}} heures d'expériences professionnelles</p>
          <div class="columns is-multiline">
            <div v-for="experience in experiences" class="column">
              <div class="box is-equal-height">
                <h3 class="title is-4">{{ experience.role }} chez {{ experience.companyName }}</h3>
                <h4 class="title is-5">Périodes</h4>
                <ul>
                  <li v-for="period in experience.periods">
                    <strong>{{period.totalHours}} heures</strong> du {{ formatDate(period.start) }} au {{ formatDate(period.end) }}
                  </li>
                </ul>
                <h4 class="title is-5" style="margin-top: 1rem;">Mes activités</h4>
                <ul class="list">
                  <li class="list-item" v-for="activity in experience.activities">{{activity}}</li>
                </ul>
                <p v-if="experience.activities.length === 0">Pas de compétence renseignées.</p>
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
          <a class="is-ok button is-dark" :href="phoenixUrl">{{progress < 100 ? 'Je termine plus tard' : 'Oui, retour sur Avril'}}</a>
          <nuxt-link to="/" class="button is-default">
            Pas encore, poursuivre l'édition
          </nuxt-link>
          <nuxt-link to="/cerfa" class="button is-default">
            Voir le formulaire officiel
          </nuxt-link>
        </div>
      </div>
  </div>
</template>

<script>
import withDateDisplayMixin from '~/mixins/withDateDisplay.js';

import {BOOKLET_MIN_HOURS} from '../constants/index';

import RecapClasse from '~/components/recapitulatif/RecapClasse.vue';
import RecapDiplome from '~/components/recapitulatif/RecapDiplome.vue';
import RecapTitres from '~/components/recapitulatif/RecapTitres.vue';
import RecapFormations from '~/components/recapitulatif/RecapFormations.vue';

import RecapName from '~/components/recapitulatif/RecapName.vue';
import RecapContact from '~/components/recapitulatif/RecapContact.vue';
import RecapBirthday from '~/components/recapitulatif/RecapBirthday.vue';
import RecapResidence from '~/components/recapitulatif/RecapResidence.vue';

export default {
  mixins: [
    withDateDisplayMixin,
  ],
  components: {
    RecapClasse,
    RecapDiplome,
    RecapTitres,
    RecapFormations,
    RecapName,
    RecapContact,
    RecapBirthday,
    RecapResidence,
  },
  data: () => ({
    phoenixUrl: `${process.env.phoenixUrl}/candidatures/actuelle`,
    bookletMinHours: BOOKLET_MIN_HOURS,
  }),
  layout: 'recapitulatif',
  computed: {
    experiences() {
      return this.$store.state.experiences
    },
    experiencesProgress() {
      return this.$store.getters['experiences/progress'];
    },
    progress() {
      return this.$store.getters.progress;
    },
  },
}
</script>

<style scoped>
.avril-recapitulatif{
  padding: 4rem;
  padding-top: 2rem;
}
</style>
