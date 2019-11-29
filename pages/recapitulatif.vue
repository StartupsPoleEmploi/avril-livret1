<template>
  <div class="avril-recapitulatif">

      <div class="recap-content">

        <div class="section">
          <h1 class="title is-1">Récapitulatif</h1>

          <div class="notification is-avril">
            <p>Vérifiez que toutes ces informations sont correctes. Si besoin corrigez-les en cliquant sur le bouton "Je dois modifier certaines informations" en bas de page.</p>
            <p>Si tout vous semble correct, votre dossier est enregistré et vous pouvez continuer.</p>
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
                    <strong>{{periodTotalHours(period)}} heures</strong> du {{ formatDate(period.start) }} au {{ formatDate(period.end) }}
                  </li>
                </ul>
                <h4 class="title is-5" style="margin-top: 1rem;">Mes activités</h4>
                <div class="content">
                  <ul>
                    <li v-for="activity in experience.activities">{{activity}}</li>
                  </ul>
                </div>
                <p v-if="experience.activities.length === 0">Pas de compétence renseignées.</p>
              </div>
            </div>
          </div>
          <div v-if="experiences.length === 0">
            <p><strong>Je n'ai pas encore renseigné d'expérience professionnelle.</strong></p>
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
        <h3 class="title is-3">Est-ce que ces informations sont exactes et complètes ?</h3>
        <div class="control">
          <div class="columns">
            <div class="column">
              <a class="is-ok button is-default is-fullwidth has-text-centered" :href="phoenixUrl">Oui</a>
            </div>
            <div class="column">
              <nuxt-link to="/" class="button is-default is-fullwidth has-text-centered">
                Je dois modifier certaines informations
              </nuxt-link>
            </div>
            <div class="column">
              <a class="is-ok button is-default is-fullwidth has-text-centered" :href="phoenixUrl">Je complèterai plus tard</a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import withDateDisplayMixin from '~/mixins/withDateDisplay.js';
import {periodTotalHours} from '~/utils/time.js';

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
  methods: {
    periodTotalHours
  }
}
</script>

<style scoped>
.avril-recapitulatif{
  padding: 4rem;
  padding-top: 2rem;
}
</style>
