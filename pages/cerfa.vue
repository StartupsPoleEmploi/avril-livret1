<template>
  <div class="avril-recapitulatif">
    <div class="recap-content">

      <section class="section header">
        <article class="message is-dark is-large">
          <div class="message-body">
            <div class="section">
              <h1 class="title is-3">Demande de recevabilité à la validation des acquis de l'expérience</h1>
              <p class="subtitle">Code de l'éducation art. R335-5 à R335-11</p>
            </div>
          </div>
        </article>
      </section>


      <section class="section section-nature">
        <h1 class="title is-4 has-text-weight-light">Rubrique 1 : Nature de la demande</h1>
        <article class="message is-dark">
          <div class="message-body">
            <div class="columns">
          <div class="column">
            <div class="control">
              <label class="radio box is-block">
                <input type="radio" name="nature" checked>
                1ère demande
              </label>
            </div>
          </div>
          <div class="column">
            <div class="control">
              <label class="radio box is-block">
                <input type="radio" name="nature">
                Renouvellement
              </label>
            </div>
          </div>
          <div class="column">
            <div class="control">
              <label class="radio box is-block">
                <input type="radio" name="nature">
                Prolongation
              </label>
            </div>
          </div>
        </div>
          </div>
        </article>
      </section>

      <section class="section section-certification">
        <h1 class="title is-4 has-text-weight-light">Rubrique 2 : Certification professionnelle que vous souhaitez obtenir</h1>
        <article class="message is-dark">
          <div class="message-body">
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
        <h1 class="title is-4 has-text-weight-light">Rubrique 3 : Etat civil/Situation du candidat</h1>

        <article class="message is-dark">
          <div class="message-body">
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
                  <p class="title is-6 is-uppercase is-spaced">{{identity.usageName}}</p>
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
                  <p class="title is-6 is-uppercase is-spaced">{{identity.birthday}}</p>
                </div>
                <div class="atome">
                  <label>Commune de naissance :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.birthPlace}}</p>
                </div>
                <div class="atome">
                  <label>Département ou collectivité outre-mer de naissance :</label>
                  <p class="title is-6 is-uppercase is-spaced"> PAS BRANCHE</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <label>Pays de naissance :</label>
                  <p class="title is-6 is-uppercase is-spaced"> PAS BRANCHE</p>
                </div>
                <div class="atome">
                  <label>Nationalité :</label>
                  <p class="title is-6 is-uppercase is-spaced"> PAS BRANCHE</p><!-- FR ou UE/UEEE ou Autre -->
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- <p><label>Nom de naissance : <small>(c'est le nom qui figure sur votre acte de naissance)</small></label> {{identity.lastName}}</p> -->
        <!-- <p><label>Nom d'usage :<small>(s'il y a lieu)</small></label> {{identity.usageName}}</p> -->
        <!-- <p><label>Prénoms :<small>(dans l'ordre de l'état civil)</small></label> {{identity.firstNames}}</p> -->
        <!-- <p><label>Date de naissance :</label> {{identity.birthday}}</p> -->
        <!-- <p><label>Sexe :</label> {{identity.sex === 'm' ? 'Masculin' : 'Féminin'}}</p> -->
        <!-- <p><label>Commune de naissance :</label> {{identity.birthPlace}}</p> -->
        <!-- <p><label>Département ou collectivité outre-mer de naissance :</label> PAS BRANCHE</p> -->
        <!-- <p><label>Pays de naissance :</label> PAS BRANCHE</p> -->
        <!-- <p><label>Nationalité :</label> PAS BRANCHE</p> -->

        <article class="message is-dark">
          <div class="message-body">
            <div class="columns">
              <div class="column">
                <div class="atome">
                  <label>Adresse actuelle :</label>
                  <p class="title is-6 is-uppercase is-spaced">{{identity.address}}</p>
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
                  <p class="title is-6 is-uppercase is-spaced">{{identity.email}}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- <p><label>Tel domicile :</label> {{identity.homePhoneNumber}}</p> -->
        <!-- <p><label>Tel portable :</label> {{identity.cellPhoneNumber}}</p> -->
        <!-- <p><label>Courriel :</label> {{identity.email}}</p> -->

        <div class="columns">
          <div class="column">
            <h3 class="title is-5 has-text-weight-light">Vous êtes actuellement :</h3>
            <article class="message is-dark">
              <div class="message-body">
                <p class="title is-6 is-uppercase is-spaced">A RAJOUTER</p>
              </div>
            </article>
          </div>
          <div class="column">
            <h3 class="title is-5 has-text-weight-light">Êtes-vous reconnu travailleur handicapé :</h3>
            <article class="message is-dark">
              <div class="message-body">
                <p class="title is-6 is-uppercase is-spaced">A RAJOUTER</p>
              </div>
            </article>
          </div>
        </div>


      </section>

      <section class="section section-level">
        <h1 class="title is-4 has-text-weight-light">Rubrique 4 : Niveau de formation/Certification(s) obtenue(s) à la date de votre demande</h1>

        <article class="message is-dark">
          <div class="message-body">
            <div class="columns">
              <div class="column">
                <div class="atome">
                  <p><label>Dernière classe suivie :</label> {{education.latestCourseLevel}}</p>
                  <p><label>Titre ou diplôme le plus élevé obtenu en France :</label> {{education.latestDegree}}</p>
                  <p><label>Autre certification obtenue en France :</label> A BRANCHER</p>
                  <p><label>Attestation de comparabilité d'un diplôme délivré dans un pays étranger :</label> PAS BRANCHE</p>
                  <p><label>Attestation de reconnaissance d'études/et ou de formation/s suivie/s à l'étranger :</label> PAS BRANCHE</p>
                  <p><label>Partie(s) de certification professionnelle obtenue/s :</label> {{education.trainings.length ? 'Oui' : 'Non'}}</p>
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
                  <p><label>Certification ou partie/s de certification professionnelle inscrite/s au Répertoire National des Certifications Professionnelles (RNCP) en rapport avec la certification professionnelle que vous souhaitez obtenir par la validation des acquis de l'expérience (VAE), :</label> {{education.trainings.join(', ')}}</p>
                </div>
              </div>
              <div class="column">
                <div class="atome">
                  <p><label>Formations courtes suivies dans le cadre de la formation continue :</label> {{education.relatedDegrees.join(', ')}}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

      </section>

      <section class="section section-experiences">
        <h1 class="title is-4 has-text-weight-light">Rubrique 5 : Information concernant votre expérience en rapport direct avec la certification viséee</h1>
      </section>

      <section class="section section-sworn">
        <h1 class="title is-4 has-text-weight-light">Rubrique 6 : Déclaration sur l'honneur</h1>
      </section>

      <section class="section section-sworn">
        <h1 class="title is-4 has-text-weight-light">Rubrique 7 : Réservé à l'organisme certificateur (ne pas remplir)</h1>
      </section>

    </div>
  </div>
</template>

<script>
import ArrowRight from '@/assets/svgs/keyboard-arrow-right.svg';
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
  },
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
