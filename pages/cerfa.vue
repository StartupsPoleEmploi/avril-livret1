<template>
  <div class="avril-recapitulatif avril-cerfa">
    <CerfaMenu />
    <div id="pdf-content" class="recap-content">
      <div class="header">
        <section class="section">
          <h1 class="title is-3">Demande de recevabilité à la validation des acquis de l'expérience</h1>
          <p class="subtitle">Code de l'éducation art. R335-5 à R335-11</p>
        </section>
      </div>
      <section class="section section-nature">
        <article class="message is-dark">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 1 : Nature de la demande</h2>
            <div class="columns">
              <div class="column">
                <div class="control box">
                  <input type="radio" checked>
                  <label>1ère demande</label>
                </div>
              </div>
              <div class="column">
                <div class="control box">
                  <input type="radio">
                  <label>Renouvellement</label>
                </div>
              </div>
              <div class="column">
                <div class="control box">
                  <input type="radio">
                  <label>Prolongation</label>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="section section-certification">
        <article class="message is-dark">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 2 : Certification professionnelle que vous souhaitez obtenir</h2>
            <div class="columns">
          <div class="column">
            <div class="atome">
              <label>Nature, intitulé complet et niveau de la certification&nbsp;:</label>
              <p class="title is-6 is-uppercase is-spaced">{{certificationLabel}}</p>
            </div>
          </div>
          <div class="column">
            <div class="atome">
              <label>Autorité responsable de la certification&nbsp;:</label>
              <p class="title is-6 is-uppercase is-spaced">{{certifierLabel}}</p>
            </div>
          </div>
        </div>
          </div>
        </article>
      </section>

      <section class="section section-identity">

        <article class="message is-dark">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 3 : Etat civil/Situation du candidat</h2>
            <div class="columns">
              <div class="column">
                <div class="atome">
                  <label>Nom de naissance&nbsp;:</label>
                  <p class="is-italic"><small>c'est le nom qui figure sur votre acte de naissance</small></p>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.lastName}}</p>
                </div>
                <div class="atome">
                  <label>Nom d'usage&nbsp;:</label>
                  <p class="is-italic"><small>s'il y a lieu</small></p>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.usageName || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Prénoms&nbsp;:</label>
                  <p class="is-italic"><small>dans l'ordre de l'état civil</small></p>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.firstNames}}</p>
                </div>
                <div class="atome">
                  <label>Sexe&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.sex === 'm' ? 'Masculin' : 'Féminin'}}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="message is-dark">
          <div class="message-body">
            <div class="columns">
              <div class="column">
                <div class="atome">
                  <label>Date de naissance&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{formatDate(identity.birthday)}}</p>
                </div>
                <div class="atome">
                  <label>Commune de naissance&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.birthPlace && identity.birthPlace.city || '-'}}</p>
                </div>
                <div class="atome">
                  <label>Département ou collectivité outre-mer de naissance&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced"> {{identity.birthPlace && identity.birthPlace.county || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Pays de naissance&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced"> {{identity.birthPlace && identity.birthPlace.country || '-'}}</p>
                </div>
                <div class="atome">
                  <label>Nationalité&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.nationality && identity.nationality.countryCode || '-'}}</p><!-- FR ou UE/UEEE ou Autre -->
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="message is-dark">
          <div class="message-body">
            <div class="columns">
              <div class="column">
                <div class="atome">
                  <label>Adresse actuelle&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced" v-html="(addressLabelify(identity.address) || '').replace('\n', '<br />')"></p>
                </div>
                <div class="atome">
                  <label>Tel domicile&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.homePhoneNumber || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Tel portable&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.cellPhoneNumber || '-'}}</p>
                </div>
                <div class="atome">
                  <label>Courriel&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">
                    <a :href="`mailto:${identity.email}`" v-if="identity.email">{{identity.email}}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div class="columns message-group">
          <div class="column">
            <article class="message is-dark">
              <div class="message-body">
                <h3 class="title is-5 has-text-weight-light">Vous êtes actuellement&nbsp;:</h3>
                <div class="control box">
                  <div class="columns">
                    <div class="column is-narrow">
                      <input type="checkbox" :checked="identity.currentSituation.status === 'working'">
                      <label>
                        1. En situation d'emploi :
                      </label>
                    </div>
                    <div class="column">
                      <ul>
                        <li v-for="type in currentSituationAnswers.employmentType">
                          <input type="checkbox" :checked="identity.currentSituation.employmentType === type.value">
                          <label>
                            {{capitalize(type.label)}}
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="control box">
                  <div class="columns">
                    <div class="column">
                      <input type="checkbox" :checked="identity.currentSituation.status === 'inactive'">
                      <label>
                        2. En inactivité
                      </label>
                    </div>
                  </div>
                </div>
                <div class="control box">
                  <div class="columns" style="margin-bottom: 0;">
                    <div class="column">
                      <input type="checkbox" :checked="identity.currentSituation.status === 'jobseeking'">
                      <label>
                          3. En recherche d'emploi :
                      </label>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-11 is-offset-1 is-print-fullwidth content">
                      <ul>
                        <li>
                          Inscrit à Pôle-emploi :
                          <input type="checkbox" :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.registerToPoleEmploi">
                          <label>Oui</label>
                          <span v-if="identity.currentSituation.registerToPoleEmploiSince">depuis le {{formatDate(identity.currentSituation.registerToPoleEmploiSince)}}</span>
                          <input type="checkbox" style="margin-left: 1rem;" :checked="identity.currentSituation.status === 'jobseeking' && !identity.currentSituation.registerToPoleEmploi">
                          <label>Non</label>
                        </li>
                        <li>
                          Vous touchez l'assurance chômage (allocation de retour à l'emploi) :
                          <input type="checkbox" :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType === 'jobless'">
                          <label>Oui</label>
                          <input type="checkbox" style="margin-left: 1rem;" :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType !== 'jobless'">
                          <label>Non</label>
                        </li>
                        <li>
                          <label>
                            Vous touchez l'assurance chômage des intermittents du spectacle :
                            <input type="checkbox" :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType === 'artist'">
                            <label>Oui</label>
                            <input type="checkbox" style="margin-left: 1rem;" :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType !== 'artist'">
                            <label>Non</label>
                          </label>
                        </li>
                        <li>
                          <label>
                            Vous êtes allocataire de minima sociaux :
                            <input type="checkbox" :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType === 'poor'">
                            <label>Oui</label>
                            <input type="checkbox" style="margin-left: 1rem;" :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType !== 'poor'">
                            <label>Non</label>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="control box">
                  <div class="columns">
                    <div class="column is-narrow">
                      <input type="checkbox" :checked="identity.currentSituation.status === 'volontary' || identity.currentSituation.status === 'election'">
                      <label>
                          4. Autres :
                      </label>
                    </div>
                    <div class="column">
                      <ul>
                        <li>
                          <input type="checkbox" :checked="identity.currentSituation.status === 'volontary'">
                          <label>Volontaire</label>
                        </li>
                        <li>
                          <input type="checkbox" :checked="identity.currentSituation.status === 'election'">
                          <label>Mandat électoral</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="columns message-group">
          <div class="column">
            <article class="message is-dark">
              <div class="message-body">
                <h3 class="title is-5 has-text-weight-light">Êtes-vous reconnu travailleur handicapé&nbsp;:</h3>
                <div class="columns">
                  <div class="column">
                    <div class="control box">
                      <input type="radio" :checked="identity.isHandicapped">
                      <label>
                        Oui
                      </label>
                    </div>
                  </div>
                  <div class="column">
                    <div class="control box">
                      <input type="radio" :checked="!identity.isHandicapped">
                      <label>
                        Non
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>


      </section>

      <section class="section section-level">

        <article class="message is-dark">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 4 : Niveau de formation/Certification(s) obtenue(s) à la date de votre demande</h2>
            <div class="columns">
              <div class="column">

                <div class="atome">
                  <label>Dernière classe suivie&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">
                    {{education.latestCourseLevel ? `${education.latestCourseLevel} : ${latestCourseLevelLabel}` : '-'}}
                  </p>
                </div>

                <div class="atome">
                  <label>Titre ou diplôme le plus élevé obtenu en France&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">
                    {{education.latestDegree ? `${education.latestDegree} : ${latestDegreeLabel}` : '-'}}
                  </p>
                </div>

                <div class="atome">
                  <label>Autre certification obtenue en France&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">Non applicable</p>
                </div>
                <div class="atome">
                  <label>Partie(s) de certification professionnelle obtenue/s&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.trainings.length ? 'Oui' : 'Non'}}</p>
                </div>
              </div>
              <div class="column" style="background-color: rgba(0, 0, 0, 0.05);">
                <h5 class="title is-6 is-uppercase has-text-centered">A compléter manuellement si besoin</h5>
                <div class="atome">
                  <p style="margin-bottom: 1rem;">
                    <label>Attestation de comparabilité d'un diplôme délivré dans un pays étranger&nbsp;:</label>
                  </p>
                  <ul>
                    <li class="is-inline-block">
                      <input type="checkbox" :checked="false">
                      <label>Niveau V</label>
                    </li>
                    <li class="is-inline-block">
                      <input type="checkbox" :checked="false">
                      <label>Niveau IV</label>
                    </li>
                    <li class="is-inline-block">
                      <input type="checkbox" :checked="false">
                      <label>Niveau III</label>
                    </li>
                    <li class="is-inline-block">
                      <input type="checkbox" :checked="false">
                      <label>Niveau II</label>
                    </li>
                    <li class="is-inline-block">
                      <input type="checkbox" :checked="false">
                      <label>Niveau I</label>
                    </li>
                  </ul>
                  <ul>

                  </ul>
                </div>
                <div class="atome">
                  <p style="margin-bottom: 1rem;">
                    <label>Attestation de reconnaissance d'études/et ou de formation/s suivie/s à l'étranger&nbsp;:</label>
                  </p>
                  <p>
                    <input type="checkbox" :checked="false">
                    <label>Oui</label>
                    <input type="checkbox" :checked="false">
                    <label>Non</label>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </article>

        <article class="message is-dark">
          <div class="message-body">
            <div class="columns">
              <div class="column">
                <div class="atome">
                  <label>Certification ou partie/s de certification professionnelle inscrite/s au Répertoire National des Certifications Professionnelles (RNCP) en rapport avec la certification professionnelle que vous souhaitez obtenir par la validation des acquis de l'expérience (VAE)&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.trainings.join(', ') || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Formations courtes suivies dans le cadre de la formation continue&nbsp;:</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.relatedDegrees.join(', ') || '-'}}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

      </section>

      <section class="section section-experiences">
        <article class="message is-dark">
          <div class="message-body content">
            <h2 class="title is-4 has-text-weight-light">Rubrique 5 : Information concernant votre expérience en rapport direct avec la certification visée</h2>
            <p v-if="experiences.length === 0">Aucune expérience professionnelle saisie.</p>
            <p v-else>{{pluralize(experiences.length, 'experience professionnelle enregistrée')}} :</p>
            <div v-for="experience in experiences" class="control atome box">
              <table class="cerfa-table">
                <tbody>
                  <tr>
                    <td>Emploi ou fonction occupée&nbsp;:</td>
                    <td><strong>{{experience.role || 'A COMPLETER'}}</strong></td>
                  </tr>
                  <tr>
                    <td>Nom et adresse de l'organisme&nbsp;:</td>
                    <td>
                      <strong>{{experience.companyName  || 'A COMPLETER'}}</strong><br />
                      {{addressLabelify(experience.companyAddress)}}
                    </td>
                  </tr>
                  <tr>
                    <td>Statut&nbsp;:</td>
                    <td><strong>{{experience.contractType}}</strong> - {{experienceStatusesLabel(experience)}}</td>
                  </tr>
                  <tr>
                    <td>Famille professionnelle&nbsp;:</td>
                    <td><strong>{{experience.category}}</strong> - {{experienceCategoriesLabel(experience)}}</td>
                  </tr>
                  <tr>
                    <td>Certification et niveau de formation suivie&nbsp;:</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>{{pluralize('Période', experience.periods.length)}}&nbsp;:</td>
                    <td>
                      <ul>
                        <li v-for="period in experience.periods">
                          <PeriodDisplay :period="period" />
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>{{pluralize('Activité', experience.activities.length)}}&nbsp;:</td>
                    <td>
                      <ul>
                        <li v-for="activity in experience.activities">{{activity}}</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </section>

      <section class="section section-sworn">
        <article class="message is-dark">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 6 : Déclaration sur l'honneur</h2>

            <div class="control atome box">
              <input type="checkbox">
              <label>
                Je ne fais pas l'objet d'une mesure pénale ou administrative d'interdiction de présentation devant un jury d'examen ou de validation des acquis de l'expérience
              </label>
            </div>

            <div class="control atome box">
              <input type="checkbox">
              <label>
                Je certifie que toutes les informations fournies sont exactes
              </label>
            </div>

            <div class="control atome box">
              <input type="checkbox">
              <label>
                Je certifie que la présente candidature constitue l'unique demande pour cette certification pour la même année civile
              </label>
            </div>

            <div class="control atome box">
              <input type="checkbox">
              <label>
                Je m'engage également à ne pas présenter plus de trois candidatures à la validation des acquis de l'expérience pour des diplômes, certificats ou titres différents durant la présente année civile
              </label>
            </div>
            <div class="control atome">
              <div class="columns">
                <div class="column">
                  <div class="box content" style="height: 200px;">
                    <p>
                      <br />
                      Fait à : ______________________________
                      <br />
                      <br />
                      <br />
                      Le : _________________________________
                      <br />
                      <br />
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="box content" style="height: 200px;">
                    <p>
                      Nom et signature <span v-if="identity.sex === 'm'">du candidat</span><span v-else>de la candidate</span> :
                      <br /><br /><br />
                      <br /><br /><br />
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>

      </section>

      <section class="section section-sworn">
        <article class="message is-danger">
          <div class="message-body content">
            <h2 class="title is-4 has-text-weight-light">Rubrique 7 : Réservé à l'organisme certificateur (ne pas remplir)</h2>

            <table class="cerfa-table">
              <tbody>
                <tr>
                  <td>Dossier reçu le&nbsp;:</td>
                  <td></td>
                  <td>Dossier complet le&nbsp;:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>N° Identifiant&nbsp;:</td>
                  <td colspan="3"></td>
                </tr>
                <tr>
                  <td>Niveau de certification visé, le cas échéant&nbsp;:</td>
                  <td></td>
                  <td>Code du diplôme&nbsp;:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Décision de recevabilité&nbsp;:</td>
                  <td colspan="3">
                    <input type="checkbox">
                    <label class="checkbox">
                      Favorable
                    </label>
                    <input type="checkbox">
                    <label class="checkbox" style="margin-left: 2rem;">
                      Défavorable
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Date de décision de la recevabilité&nbsp;:</td>
                  <td></td>
                  <td>Date limite de validité de la recevabilité (le cas échéant)&nbsp;:</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>
      <CerfaMenu />
    </div>
  </div>
</template>

<script>
  import ArrowRight from 'avril/images/icons/arrow-right.svg';
  import {capitalize, pluralize} from 'avril/js/utils/string.js';
  import {labelGetter} from 'avril/js/utils/function.js';
  import {addressLabelify} from 'avril/js/utils/geo.js';
  import {formatDate} from 'avril/js/utils/time.js';
  import CerfaMenu from '~/components/CerfaMenu';
  import PeriodDisplay from '~/components/PeriodDisplay.vue';
  import currentSituationAnswers from '~/contents/data/currentSituation';
  import experienceStatusesAnswers from '~/contents/data/experienceStatuses';
  import experienceCategoriesAnswers from '~/contents/data/experienceCategories';

  export default {
    components: {
      ArrowRight,
      CerfaMenu,
      PeriodDisplay,
    },
    layout: 'cerfa',
    computed: {
      certificationLabel() {
        return this.$store.state.certificationLabel
      },
      certifierLabel() {
        return this.$store.state.certifierLabel
      },
      identity() {
        return this.$store.state.identity
      },
      education() {
        return this.$store.state.education
      },
      experiences() {
        return this.$store.state.experiences
      },
      latestDegreeLabel() {
        return this.$store.getters['education/latestDegreeLabel'];
      },
      latestCourseLevelLabel() {
        return this.$store.getters['education/latestCourseLevelLabel'];
      },
    },
    data() {
      return {
        currentSituationAnswers,
        experienceStatusesAnswers,
        htmlBody: null,
      }
    },
    methods: {
      capitalize,
      pluralize,
      addressLabelify,
      experienceStatusesLabel(experience) {
        return labelGetter(experienceStatusesAnswers, experience.contractType)
      },
      experienceCategoriesLabel(experience) {
        return labelGetter(experienceCategoriesAnswers, experience.category)
      },
      formatDate,
    }
  }
</script>

<style lang="scss">
  .avril-recapitulatif{
    padding: 2rem;
  }
  section {
    margin: 2rem 1rem;
    padding: 0;
  }
  .message.is-avril{
    background: #fbfbfb;
  }
  .message.is-avril .message-body{
    border-color: #66f2b3;
  }
  .atome{
    margin-bottom: 2rem;
  }
  .is-spaced{
    letter-spacing: .1rem;
  }
  .is-bottom-bordered{
    /* border-bottom: 2px solid #333; */
  }
  @media screen {
    .unseen{
      display: none;
    }
  }

  input[type="checkbox"], input[type="radio"] {
    position: absolute;
    opacity: 0;

    & + label {
      position: relative;
      cursor: initial;
      padding: 0;
      padding-left: 5px;

      &:before {
        content: '';
        margin-right: 5px;
        display: inline-block;
        vertical-align: text-top;
        width: 1.25rem;
        height: 1.25rem;
        background: none;
        font-size: 1.25rem;
        line-height: 1.25rem;
        border: thin solid;
        font-weight: bold;
      }
    }

    &:checked + label:before {
      content: '✓';
    }
  }

  table.cerfa-table {
    width: 100%;
    font-size: 1rem;
    tr {
      td {
        padding: 0.5rem;
        &:first-child {
          text-align: right;
          width: 25%;
        }
        &:last-child {
          width: 75%;
        }

        &:nth-child(3), &:nth-child(4) {
          width: 25%;
        }

        ul {
          margin-top: 0;
          margin-left: 1rem;
        }
      }
      &:last-child td {
        border-bottom: none;
      }
    }
  }
</style>
