<template>
  <div class="avril-recapitulatif">
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
                  <label class="radio box is-block">
                    <input type="radio" checked>
                    1ère demande
                  </label>
                </div>
              </div>
              <div class="column">
                <div class="control">
                  <label class="radio box is-block">
                    <input type="radio" disabled>
                    Renouvellement
                  </label>
                </div>
              </div>
              <div class="column">
                <div class="control">
                  <label class="radio box is-block">
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
                  <p class="title is-6 is-uppercase is-spaced"> PAS BRANCHE</p><!-- FR ou UE/UEEE ou Autre -->
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
                  <p class="title is-6 is-uppercase is-spaced">{{identity.homePhoneNumber}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Tel portable :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.cellPhoneNumber}}</p>
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
                      <label class="radio is-block">
                        <input type="checkbox">
                        1. En situation d'emploi :
                      </label>
                    </div>
                    <div class="column">
                      <ul>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> CDI
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> CDD, CDD d'usage et intérim
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> Travailleur indépendant, artisan et profession libérale
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> Fonctionnaire
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> Militaire
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> Contrat aidé ou contrat en alternance
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
                        <input type="checkbox">
                        2. En inactivité
                      </label>
                    </div>
                  </div>
                </div>
                <div class="control box">
                  <div class="columns" style="margin-bottom: 0;">
                    <div class="column">
                      <label class="radio is-block">
                        <input type="checkbox">
                          3. En recherche d'emploi :
                      </label>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-11 is-offset-1 content">
                      <ul>
                        <li>
                          Inscrit à Pôle-emploi : <input type="checkbox"> Oui, depuis le {{'NON RENSEIGNE'}} <input type="checkbox" style="margin-left: 1rem;"> Non
                        </li>
                        <li>
                          Vous touchez l'assurance chômage (allocation de retour à l'emploi) : <input type="checkbox"> Oui <input type="checkbox" style="margin-left: 1rem;"> Non
                        </li>
                        <li>
                          <label class="radio is-block">
                            Vous touchez l'assurance chômage des intermittents du spectacle : <input type="checkbox"> Oui <input type="checkbox" style="margin-left: 1rem;"> Non
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            Vous êtes allocataire de minima sociaux : <input type="checkbox"> Oui <input type="checkbox" style="margin-left: 1rem;"> Non
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
                        <input type="checkbox">
                          4. Autres :
                      </label>
                    </div>
                    <div class="column">
                      <ul>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> Volontaire
                          </label>
                        </li>
                        <li>
                          <label class="radio is-block">
                            <input type="checkbox"> Mandat électoral
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
                        <input type="radio" disabled>
                        Oui
                      </label>
                    </div>
                  </div>
                  <div class="column">
                    <div class="control">
                      <label class="radio box is-block">
                        <input type="radio" checked>
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
                  <p class="title is-6 is-uppercase is-spaced">{{education.latestCourseLevel}} : {{latestCourseLevelLabel}}</p>
                </div>

                <div class="atome">
                  <label>Titre ou diplôme le plus élevé obtenu en France :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.latestDegree}} : {{latestDegreeLabel}}</p>
                </div>

                <div class="atome">
                  <label>Autre certification obtenue en France :</label>
                  <p class="title is-6 is-uppercase is-spaced">A BRANCHER</p>
                </div>

              </div>
              <div class="column">

                <div class="atome">
                  <label>Attestation de comparabilité d'un diplôme délivré dans un pays étranger :</label>
                  <p class="title is-6 is-uppercase is-spaced">PAS BRANCHE</p>
                </div>
                <div class="atome">
                  <label>Attestation de reconnaissance d'études/et ou de formation/s suivie/s à l'étranger :</label>
                  <p class="title is-6 is-uppercase is-spaced">PAS BRANCHE</p>
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
                  <p class="title is-6 is-uppercase is-spaced">{{education.trainings.join(', ')}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Formations courtes suivies dans le cadre de la formation continue :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{education.relatedDegrees.join(', ')}}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

      </section>

      <section class="section section-experiences">
        <article class="message is-dark">
          <div class="message-body">
            <h2 class="title is-4 has-text-weight-light">Rubrique 5 : Information concernant votre expérience en rapport direct avec la certification viséee</h2>
          </div>
        </article>
      </section>

      <section class="section section-sworn">
        <h3 class="title is-3">Déclaration sur l'honneur</h3>
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
import withDateDisplayMixin from '~/mixins/withDateDisplay.js';
import {addressLabelify} from '~/utils/geo.js';
import latestDegreeAnswers from '~/contents/data/latestDegree';
import latestCourseLevelAnswers from '~/contents/data/latestCourseLevel';

export default {
  mixins: [
    withDateDisplayMixin
  ],
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
      htmlBody: null,
    }
  },
  methods: {
    addBody(e) {
      this.htmlBody = document.documentElement.outerHTML;
    },
    async pdfDownload() {
      const result = await fetch('/cerfa.pdf', {
        method: 'POST',
        body: document.documentElement.outerHTML,
      })
      console.log(result)
    },
    addressLabelify,
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
