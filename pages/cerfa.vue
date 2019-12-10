<template>
  <div class="avril-recapitulatif avril-cerfa">
    <form @submit="addBody" method="POST" action="/cerfa.pdf" class="download">
      <input type="hidden" name="body" :value="htmlBody">
      <button type="submit" class="button is-dark is-pulled-right">Télécharger le PDF</button>
    </form>
    <div id="pdf-content" class="recap-content">

      <div class="header">
        <!-- <article class="message is-dark is-large">
          <div class="message-body"> -->
            <div class="section">
              <h1 class="title is-3">Demande de recevabilité à la validation des acquis de l'expérience</h1>
              <p class="subtitle">Code de l'éducation art. R335-5 à R335-11</p>
            </div>
          <!-- </div>
        </article> -->
      </div>


      <section class="section section-nature">
        <article class="message is-dark">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 1 : Nature de la demande</h2>
            <div class="columns">
              <div class="column">
                <div class="control">
                  <label class="box">
                    <input type="radio" checked>
                    1ère demande
                  </label>
                </div>
              </div>
              <div class="column">
                <div class="control">
                  <label class="box">
                    <input type="radio" disabled>
                    Renouvellement
                  </label>
                </div>
              </div>
              <div class="column">
                <div class="control">
                  <label class="box">
                    <input type="radio" disabled>
                    Prolongation
                  </label>
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
              <label>Nature, intitulé complet et niveau de la certification :</label>
              <p class="title is-6 is-uppercase is-spaced">{{certificationLabel}}</p>
            </div>
          </div>
          <div class="column">
            <div class="atome">
              <label>Autorité responsable de la certification :</label>
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
                  <label>Nom de naissance :</label>
                  <p class="is-italic"><small>c'est le nom qui figure sur votre acte de naissance</small></p>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.lastName}}</p>
                </div>
                <div class="atome">
                  <label>Nom d'usage :</label>
                  <p class="is-italic"><small>s'il y a lieu</small></p>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.usageName || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Prénoms :</label>
                  <p class="is-italic"><small>dans l'ordre de l'état civil</small></p>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.firstNames}}</p>
                </div>
                <div class="atome">
                  <label>Sexe :</label>
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
                  <label>Date de naissance :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{formatDate(identity.birthday)}}</p>
                </div>
                <div class="atome">
                  <label>Commune de naissance :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.birthPlace.city}}</p>
                </div>
                <div class="atome">
                  <label>Département ou collectivité outre-mer de naissance :</label>
                  <p class="title is-6 is-uppercase is-spaced"> {{identity.birthPlace.domTom || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Pays de naissance :</label>
                  <p class="title is-6 is-uppercase is-spaced"> {{identity.birthPlace.country}}</p>
                </div>
                <div class="atome">
                  <label>Nationalité :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.nationality.country_code}}</p><!-- FR ou UE/UEEE ou Autre -->
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
                  <label>Adresse actuelle :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{addressLabelify(identity.address)}}</p>
                </div>
                <div class="atome">
                  <label>Tel domicile :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.homePhoneNumber || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Tel portable :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.cellPhoneNumber || '-'}}</p>
                </div>
                <div class="atome">
                  <label>Courriel :</label>
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
                <h3 class="title is-5 has-text-weight-light">Vous êtes actuellement :</h3>
                <div class="control box">
                  <div class="columns">
                    <div class="column is-narrow">
                      <label>
                        <input type="checkbox" disabled :checked="identity.currentSituation.status === 'working'">
                        1. En situation d'emploi :
                      </label>
                    </div>
                    <div class="column">
                      <ul>
                        <li v-for="type in currentSituationAnswers.employmentType">
                          <label>
                            <input type="checkbox" disabled :checked="identity.currentSituation.employmentType === type.value"> {{capitalize(type.label)}}
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="control box">
                  <div class="columns">
                    <div class="column is-narrow">
                      <label class="radio is-block">
                        <input type="checkbox" disabled :checked="identity.currentSituation.status === 'inactive'">
                        2. En inactivité
                      </label>
                    </div>
                  </div>
                </div>
                <div class="control box">
                  <div class="columns" style="margin-bottom: 0;">
                    <div class="column">
                      <label class="radio is-block">
                        <input type="checkbox" disabled :checked="identity.currentSituation.status === 'jobseeking'">
                          3. En recherche d'emploi :
                      </label>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-11 is-offset-1 content">
                      <ul>
                        <li>
                          Inscrit à Pôle-emploi :
                          <input type="checkbox" disabled :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.registerToPoleEmploi"> Oui
                          <span v-if="identity.currentSituation.registerToPoleEmploiSince">depuis le {{formatDate(identity.currentSituation.registerToPoleEmploiSince)}}</span>
                          <input type="checkbox" style="margin-left: 1rem;" disabled :checked="identity.currentSituation.status === 'jobseeking' && !identity.currentSituation.registerToPoleEmploi"> Non
                        </li>
                        <li>
                          Vous touchez l'assurance chômage (allocation de retour à l'emploi) :
                          <input type="checkbox" disabled :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType === 'jobless'"> Oui
                          <input type="checkbox" style="margin-left: 1rem;" disabled :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType !== 'jobless'"> Non
                        </li>
                        <li>
                          <label class="radio is-block">
                            Vous touchez l'assurance chômage des intermittents du spectacle :
                            <input type="checkbox" disabled :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType === 'artist'"> Oui
                            <input type="checkbox" style="margin-left: 1rem;" disabled :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType !== 'artist'"> Non
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            Vous êtes allocataire de minima sociaux :
                            <input type="checkbox" disabled :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType === 'poor'"> Oui
                            <input type="checkbox" style="margin-left: 1rem;" disabled :checked="identity.currentSituation.status === 'jobseeking' && identity.currentSituation.compensationType !== 'poor'"> Non
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="control box">
                  <div class="columns">
                    <div class="column is-narrow">
                      <label class="radio is-block">
                        <input type="checkbox" disabled :checked="identity.currentSituation.status === 'volontary' || identity.currentSituation.status === 'election'">
                          4. Autres :
                      </label>
                    </div>
                    <div class="column">
                      <ul>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox" disabled :checked="identity.currentSituation.status === 'volontary'"> Volontaire
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox" disabled :checked="identity.currentSituation.status === 'election'"> Mandat électoral
                          </label>
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
                <h3 class="title is-5 has-text-weight-light">Êtes-vous reconnu travailleur handicapé :</h3>
                <div class="columns">
                  <div class="column">
                    <div class="control">
                      <label class="radio box is-block">
                        <input type="radio" disabled :checked="identity.isHandicapped">
                        Oui
                      </label>
                    </div>
                  </div>
                  <div class="column">
                    <div class="control">
                      <label class="radio box is-block">
                        <input type="radio" :checked="!identity.isHandicapped">
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
                  <label>Dernière classe suivie :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.latestCourseLevel ? `${education.latestCourseLevel} : ${latestCourseLevelLabel}` : '-'}}</p>
                </div>

                <div class="atome">
                  <label>Titre ou diplôme le plus élevé obtenu en France :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.latestDegree ? `${education.latestDegree} : ${latestDegreeLabel}` : '-'}}</p>
                </div>

                <div class="atome">
                  <label>Autre certification obtenue en France :</label>
                  <p class="title is-6 is-uppercase is-spaced">Non applicable</p>
                </div>

              </div>
              <div class="column">

                <div class="atome">
                  <label>Attestation de comparabilité d'un diplôme délivré dans un pays étranger :</label>
                  <p class="title is-6 is-uppercase is-spaced">Non applicable</p>
                </div>
                <div class="atome">
                  <label>Attestation de reconnaissance d'études/et ou de formation/s suivie/s à l'étranger :</label>
                  <p class="title is-6 is-uppercase is-spaced">Non applicable</p>
                </div>
                <div class="atome">
                  <label>Partie(s) de certification professionnelle obtenue/s :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.trainings.length ? 'Oui' : 'Non'}}</p>
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
                  <label>Certification ou partie/s de certification professionnelle inscrite/s au Répertoire National des Certifications Professionnelles (RNCP) en rapport avec la certification professionnelle que vous souhaitez obtenir par la validation des acquis de l'expérience (VAE) :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.trainings.join(', ') || '-'}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Formations courtes suivies dans le cadre de la formation continue :</label>
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
            <h2 class="title is-4 has-text-weight-light">Rubrique 5 : Information concernant votre expérience en rapport direct avec la certification viséee</h2>
            <p v-if="experiences.length === 0">Aucune expérience professionnelle saisie.</p>
            <p v-else>{{pluralize(experiences.length, 'experience professionnelle enregistrée')}} :</p>
            <div v-for="experience in experiences" class="control atome box">
              <table class="experience-table">
                <tbody>
                  <tr>
                    <td>Emploi ou fonction occupée :</td>
                    <td><strong>{{experience.role}}</strong></td>
                  </tr>
                  <tr>
                    <td>Nom et adresse de l'organisme :</td>
                    <td>
                      <strong>{{experience.companyName}}</strong><br />
                      {{addressLabelify(experience.companyAddress)}}
                    </td>
                  </tr>
                  <tr>
                    <td>Statut :</td>
                    <td><strong>{{experience.contractType}}</strong> - {{experienceStatusesLabel(experience)}}</td>
                  </tr>
                  <tr>
                    <td>Famille professionnelle</td>
                    <td><strong>{{experience.category}}</strong> - {{experienceCategoriesLabel(experience)}}</td>
                  </tr>
                  <tr>
                    <td>Certification et niveau de formation suivie :</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>{{pluralize('Période', experience.periods.length)}} :</td>
                    <td>
                      <ul>
                        <li v-for="period in experience.periods">
                          <strong>{{period.weekHours}}h/semaine</strong>
                          du <strong>{{formatDate(period.start)}}</strong>
                          <span v-if="period.end">au <strong>{{formatDate(period.end)}}</strong></span>
                          <span v-else>à <strong>aujourd'hui</strong></span>
                          soit <strong>{{periodTotalHours(period)}} heures</strong> au total
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>{{pluralize('Activité', experience.activities.length)}}  :</td>
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

            <div class="control atome">
              <label class="radio box is-block">
                <input type="checkbox">
                Je ne fais pas l'objet d'une mesure pénale ou administrative d'interdiction de présentation devant un jury d'examen ou de validation des acquis de l'expérience
              </label>
            </div>

            <div class="control atome">
              <label class="radio box is-block">
                <input type="checkbox">
                Je certifie que toutes les informations fournies sont exactes
              </label>
            </div>

            <div class="control atome">
              <label class="radio box is-block">
                <input type="checkbox">
                Je certifie que la présente candidature constitue l'unique demande pour cette certification pour la même année civile
              </label>
            </div>

            <div class="control atome">
              <label class="radio box is-block">
                <input type="checkbox">
                Je m'engage également à ne pas présenter plus de trois candidatures à la validation des acquis de l'expérience pour des diplômes, certificats ou titres différents durant la présente année civile
              </label>
            </div>

          </div>
        </article>

      </section>

      <section class="section section-sworn">
        <article class="message is-danger">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 7 : Réservé à l'organisme certificateur (ne pas remplir)</h2>
          </div>
        </article>
      </section>

    </div>
  </div>
</template>

<script>
import ArrowRight from '@/assets/svgs/keyboard-arrow-right.svg';
import {capitalize, pluralize} from '~/utils/string.js';
import {labelGetter} from '~/utils/function.js';
import {addressLabelify} from '~/utils/geo.js';
import {periodTotalHours, formatDate} from '~/utils/time.js';
import currentSituationAnswers from '~/contents/data/currentSituation';
import experienceStatusesAnswers from '~/contents/data/experienceStatuses';
import experienceCategoriesAnswers from '~/contents/data/experienceCategories';

export default {
  components: {
    ArrowRight
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
    addBody(e) {
      this.htmlBody = document.documentElement.outerHTML;
    },
    capitalize,
    pluralize,
    async pdfDownload() {
      const result = await fetch('/cerfa.pdf', {
        method: 'POST',
        body: document.documentElement.outerHTML,
      })
    },
    addressLabelify,
    experienceStatusesLabel(experience) {
      return labelGetter(experienceStatusesAnswers, experience.contractType)
    },
    experienceCategoriesLabel(experience) {
      return labelGetter(experienceCategoriesAnswers, experience.category)
    },
    periodTotalHours,
    formatDate,
  }
}
</script>

<style scoped>
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
</style>
