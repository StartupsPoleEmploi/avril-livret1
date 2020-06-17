<template>
  <div class="avril-recapitulatif">
    <section class="recap-section">
      <h1 class="title is-1">Récapitulatif</h1>
      <div class="notification is-avril section is-small">
        <p>Vérifiez que toutes ces informations sont correctes. Si besoin corrigez-les en cliquant sur le bouton "Je dois modifier certaines informations" en bas de page.</p>
        <p>Si tout vous semble correct, votre dossier est enregistré et vous pouvez continuer.</p>
      </div>
    </section>

    <section class="recap-section section-formation">
      <div class="content">
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
      </div>
    </section>

    <section class="recap-section section-experiences">
      <div class="content">
        <h3 class="title is-3">Mes expériences professionnelles</h3>
        <p v-if="experiencesProgress == 100">J'ai plus de {{bookletMinHours}} heures d'expériences professionnelles</p>
        <div class="columns is-multiline">
          <div v-for="experience in experiences" class="column">
            <div class="box is-equal-height">
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
      </div>
    </section>

    <section class="recap-section section-identite">
      <h3 class="title is-3">Mon identité</h3>
      <div class="recap-cell cell-name">
        <p v-if="identity.firstNames && identity.lastName">
          Je me nomme <strong>{{identity.lastName}} {{identity.firstNames}}</strong>
          <span v-if="identity.usageName">(Nom d'usage : {{identity.usageName}})</span>
        </p>
        <p v-else>
          <strong>Je n'ai pas encore renseigné mon nom.</strong>
        </p>
        <p>Je suis de sexe {{identity.sex ? (identity.sex && identity.sex[0] === 'm' ? 'masculin' : 'féminin') : 'inconnu'}}.</p>
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
        <p v-if="identity.nationality && identity.nationality.countryCode">Je suis de nationalité {{identity.nationality.countryCode.toUpperCase()}}.</p>
        <p v-else>Je n'ai pas encore renseigné ma nationalité.</p>
      </div>
      <div class="recap-cell cell-residence">
        <p v-if="isPresent(identity.address)">J'habite {{addressLabelify(identity.address)}}.</p>
        <p v-else><strong>Je n'ai pas encore renseigné mon adresse.</strong></p>
      </div>
    </section>
    <section class="recap-section section-situation">
      <h3 class="title is-3">Ma situation actuelle</h3>
      <p>Je {{identity.isHandicapped ? 'suis' : 'ne suis pas'}} {{feminize('reconnu')}} {{feminize('travailleur', 'travailleuse')}} {{feminize('handicapé')}}.</p>
      <p v-if="identity.currentSituation.status">
        Je suis actuellement en <strong>{{currentSituationStatusLabel}}</strong><span v-if="identity.currentSituation.employmentType"> : <strong>{{currentSituationEmploymentTypeLabel}}</strong></span>.</p>
      <p v-else>Je n'ai pas renseigné ma situation d'emploi.</p>
      <p v-if="identity.currentSituation.registerToPoleEmploi !== null">
        Je {{identity.currentSituation.registerToPoleEmploi ? 'suis' : 'ne suis pas'}} {{feminize('inscrit')}} à Pôle-emploi<span v-if="identity.currentSituation.registerToPoleEmploiSince"> depuis le {{formatDate(identity.currentSituation.registerToPoleEmploiSince)}}</span>.</p>
      <p v-if="identity.currentSituation.compensationType">Je suis {{feminize('indemnisé')}} <strong>{{currentSituationCompensationTypeLabel}}</strong>.</p>
    </section>
    <section class="recap-section section-confirmation">
      <div class="notification is-avril section is-small has-text-centered">
        <h3 class="title is-3">Est-ce que ces informations sont exactes et complètes ?</h3>
        <div class="control">
          <div class="columns is-centered">
            <div class="column">
              <button @click="markAsCompleteAndGoBack" class="button is-dark is-fullwidth is-wrapped" to="/cerfa">
                <span>
                  <Check />
                  Je certifie exacte l'intégralité des informations fournies dans ce document
                </span>
              </button>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column">
              <a class="button is-fullwidth is-white is-wrapped" :href="backUrl">
                <span>
                  <Back />
                  Je complèterai plus tard
                </span>
              </a>
            </div>
            <div class="column">
              <nuxt-link to="/" class="button is-fullwidth is-white is-wrapped">
                <span>
                  <Pencil />
                  Je dois modifier certaines informations
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div v-if="errorMsg" class="notification is-danger">
        <p>{{errorMsg}}</p>
      </div>
    </section>
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
  import Back from 'avril/images/icons/back.svg';
  import Pencil from 'avril/images/icons/pencil.svg';
  import Check from 'avril/images/icons/check.svg';

  import {saveLocalState} from '~/utils/url';

  export default {
    data: () => ({
      bookletMinHours: BOOKLET_MIN_HOURS,
      errorMsg: null,
    }),
    layout: 'recapitulatif',
    components: {
      Back,
      Check,
      Pencil,
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
        return phoenixUrl({hash: this.$store.state.hash});
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
      markAsCompleteAndGoBack: function() {
        this.$store.commit('markAsComplete');
        saveLocalState()(this.$store).then(res => {
          if (res.ok) {
            window.location.href = this.backUrl;
          } else {
            this.errorMsg = 'Désolé nous ne sommes pas parvenu à enregistrer. Merci de réessayer plus tard.'
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .recap-section:not(:last-child) {
    padding-bottom: 3rem;
  }
</style>