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
          <div class="recap-cell cell-classe">
            <p v-if="!education.latestCourseLevel">Je n'ai pas encore renseigné ma dernière classe.</p>
            <p v-else>Je suis {{feminize('allé')}} jusqu'en <strong>{{latestCourseLevelLabel}}</strong></p>
          </div>
          <div class="recap-cell cell-diplome">
            <p v-if="!education.latestDegree">Je n'ai pas encore renseigné mon diplôme le plus élevé.</p>
            <p v-else>{{education.latestDegree > 1 ? 'J\'ai un' : 'Je n\'ai'}} <strong>{{latestDegreeLabel}}</strong></p>
          </div>
          <div class="recap-cell cell-titres">
            <div v-if="relatedDegrees.length" >
              J'ai un diplôme de
              <span v-for="degree, index in relatedDegrees">
                <span><strong>{{ degree }}</strong> <span v-if="index < relatedDegrees.length-1">et de </span></span>
              </span>
            </div>
            <div v-else>
              Je n'ai pas de diplôme supplémentaire.
            </div>
          </div>
          <div class="recap-cell cell-formations">
            <div v-if="education.trainings.length">
              J'ai suivi une formation de
              <span v-for="training, index in education.trainings">
                <span><strong>{{ training }}</strong> <span v-if="index < education.trainings.length-1">et de </span></span>
              </span>
            </div>
            <div v-else>
              Je n'ai pas suivi de formation supplémentaire.
            </div>
          </div>
        </section>

        <section class="section section-formation">
          <h3 class="title is-3">Mes expériences professionnelles</h3>
          <p v-if="experiencesProgress == 100">J'ai plus de {{bookletMinHours}} heures d'expériences professionnelles</p>
          <div class="columns is-multiline">
            <div v-for="experience in experiences" class="column">
              <div class="box is-equal-height content">
                <h3 class="is-4">
                  <CompanyDisplay :experience="experience" />
                </h3>
                <p>{{addressLabelify(experience.companyAddress)}}</p>
                <p class="has-text-weight-bold  ">Périodes :</p>
                <ul>
                  <li v-for="period in experience.periods">
                    <PeriodDisplay :period="period" />
                  </li>
                </ul>
                <p class="has-text-weight-bold">Mes activités :</p>
                <div>
                  <ul>
                    <li v-for="activity in experience.activities">{{activity}}</li>
                  </ul>
                </div>
                <p v-if="experience.activities.length === 0">Pas d'activité renseignée.</p>
              </div>
            </div>
          </div>
          <div v-if="experiences.length === 0">
            <p><strong>Je n'ai pas encore renseigné d'expérience professionnelle.</strong></p>
          </div>
        </section>

        <section class="section section-identite">
          <h3 class="title is-3">Mon identité</h3>
          <div class="recap-cell cell-name">
            <p v-if="identity.firstNames && identity.lastName">
              Je me nomme <strong>{{identity.lastName}} {{identity.firstNames}}</strong>
              <span v-if="identity.usageName">(Nom d'usage : {{identity.usageName}})</span>
            </p>
            <p v-else>
              <strong>Je n'ai pas encore renseigné mon nom.</strong>
            </p>
            <p>Je suis de sexe {{identity.sex ? (identity.sex === 'm' ? 'masculin' : 'féminin') : 'inconnu'}}.</p>
          </div>
          <div class="recap-cell cell-contact">
            <p v-if="identity.email">Mon email : <strong>{{identity.email}}</strong></p>
            <p v-else><strong>Je n'ai pas encore renseigné mon email.</strong></p>
            <p v-if="identity.homePhoneNumber">Numéro de téléphone fixe : {{identity.homePhoneNumber}}.</p>
            <p v-else>Je n'ai pas renseigné mon numéro de téléphone fixe.</p>
            <p v-if="identity.cellPhoneNumber">Numéro de téléphone mobile : {{identity.cellPhoneNumber}}.</p>
            <p v-else>Je n'ai pas renseigné mon numéro de téléphone mobile.</p>
          </div>
          <div class="recap-cell cell-birthday">
            <p v-if="identity.birthday">Je suis {{feminize('né')}} le {{formatDate(identity.birthday)}} à {{addressLabelify(identity.birthPlace)}}</p>
            <p v-else>Je n'ai pas encore renseigné ma date de naissance.</p>
            <p v-if="identity.nationality.country_code">Je suis de nationalité {{identity.nationality.country_code.toUpperCase()}}.</p>
            <p v-else>Je n'ai pas encore renseigné ma nationalité.</p>
          </div>
          <div class="recap-cell cell-residence">
            <p v-if="isPresent(identity.address)">J'habite {{addressLabelify(identity.address)}}.</p>
            <p v-else><strong>Je n'ai pas encore renseigné mon adresse.</strong></p>
          </div>
        </section>
        <section class="section section-identite">
          <h3 class="title is-3">Ma situation actuelle</h3>
          <p>Je {{identity.isHandicapped ? 'suis' : 'ne suis pas'}} {{feminize('reconnu')}} {{feminize('travailleur', 'travailleuse')}} {{feminize('handicapé')}}.</p>
          <p v-if="identity.currentSituation.status">
            Je suis actuellement en <strong>{{currentSituationStatusLabel}}</strong><span v-if="identity.currentSituation.employmentType"> : <strong>{{currentSituationEmploymentTypeLabel}}</strong></span>.</p>
          <p v-else>Je n'ai pas renseigné ma situation d'emploi.</p>
          <p v-if="identity.currentSituation.registerToPoleEmploi !== null">
            Je {{identity.currentSituation.registerToPoleEmploi ? 'suis' : 'ne suis pas'}} {{feminize('inscrit')}} à Pôle-emploi<span v-if="identity.currentSituation.registerToPoleEmploiSince"> depuis le {{formatDate(identity.currentSituation.registerToPoleEmploiSince)}}</span>.</p>
          <p v-if="identity.currentSituation.compensationType">Je suis {{feminize('indemnisé')}} <strong>{{currentSituationCompensationTypeLabel}}</strong>.</p>
        </section>
      </div>
      <div class="notification is-avril">
        <h3 class="title is-3 has-text-centered">Est-ce que ces informations sont exactes et complètes ?</h3>
        <div class="control">
          <div class="columns">
            <div class="column">
              <button @click="markAsCompleteAndGoToCerfa" class="is-ok button is-default is-fullwidth" to="/cerfa">Oui</button>
            </div>
            <div class="column">
              <nuxt-link to="/" class="button is-default is-fullwidth has-text-centered">
                Je dois modifier certaines informations
              </nuxt-link>
            </div>
            <div class="column">
              <a class="is-ok button is-default is-fullwidth has-text-centered" :href="backUrl">Je complèterai plus tard</a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {isPresent} from 'avril/js/utils/boolean.js';
  import {periodTotalHours, formatDate} from 'avril/js/utils/time.js';
  import {addressLabelify} from 'avril/js/utils/geo.js';
  import {feminize} from 'avril/js/utils/string.js';
  import {phoenixUrl} from '~/utils/url.js';

  import {BOOKLET_MIN_HOURS} from '~/constants/index';

  import CompanyDisplay from '~/components/CompanyDisplay.vue';
  import PeriodDisplay from '~/components/PeriodDisplay.vue';

  export default {
    data: () => ({
      bookletMinHours: BOOKLET_MIN_HOURS,
    }),
    layout: 'recapitulatif',
    components: {
      CompanyDisplay,
      PeriodDisplay,
    },
    computed: {
      education() {
        return this.$store.state.education
      },
      latestCourseLevelLabel() {
        return this.$store.getters['education/latestCourseLevelLabel'];
      },
      latestDegreeLabel() {
        return this.$store.getters['education/latestDegreeLabel'];
      },
      relatedDegrees () {
        return this.$store.state.education.relatedDegrees
      },
      identity() {
        return this.$store.state.identity
      },
      experiences() {
        return this.$store.state.experiences
      },
      experiencesProgress() {
        return this.$store.getters['experiences/progress'];
      },
      progress() {
        return this.$store.getters.progress;
      },
      backUrl() {
        return phoenixUrl(this.$store.state.hash);
      },
      currentSituationStatusLabel() {
        return this.$store.getters['identity/currentSituationStatusLabel'];
      },
      currentSituationEmploymentTypeLabel() {
        return this.$store.getters['identity/currentSituationEmploymentTypeLabel'];
      },
      currentSituationCompensationTypeLabel() {
        return this.$store.getters['identity/currentSituationCompensationTypeLabel'];
      },
    },
    methods: {
      feminize: function(word, feminineVersion) {
        return feminize(word, this.$store.state.identity.sex, feminineVersion);
      },
      formatDate,
      periodTotalHours,
      addressLabelify,
      isPresent,
      markAsCompleteAndGoToCerfa: function() {
        this.$store.commit('markAsComplete');
        this.$router.push({
          path: '/cerfa'
        })
      },
    }
  }
</script>

<style scoped>
  .avril-recapitulatif{
    padding: 4rem;
    padding-top: 2rem;
  }
</style>
