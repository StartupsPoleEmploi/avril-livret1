<template>
  <div class="avril-recapitulatif">
    <div class="recap-content">

      <div class="section has-text-centered">
        <h1 class="title is-2 is-uppercase">Demande de recevabilité à la validation des acquis de l'expérience</h1>
        <p>Code de l'éducation art. R335-5 à R335-11</p>
      </div>


      <section class="section section-nature">
        <h1 class="title is-4">Rubrique 1 : Nature de la demande</h1>
        <ul>
          <li>1ère demande : <input type="checkbox" checked></li>
          <li>Renouvellement : <input type="checkbox"></li>
          <li>Prolongation : <input type="checkbox"></li>
        </ul>
      </section>

      <section class="section section-certification">
        <h1 class="title is-4">Rubrique 2 : Certification professionnelle que vous souhaitez obtenir</h1>
        <p><label>Nature, intitulé complet et niveau de la certification :</label> {{certificationLabel}}</p>
        <p><label>Autorité responsable de la certification :</label> {{certifierLabel}}</p>
      </section>

      <section class="section section-identity">
        <h1 class="title is-4">Rubrique 3 : Etat civil/Situation du candidat</h1>
        <p><label>Nom de naissance : <small>(c'est le nom qui figure sur votre acte de naissance)</small></label> {{identity.lastName}}</p>
        <p><label>Nom d'usage :<small>(s'il y a lieu)</small></label> {{identity.usageName}}</p>
        <p><label>Prénoms :<small>(dans l'ordre de l'état civil))</small></label> {{identity.firstNames}}</p>
        <p><label>Date de naissance :</label> {{identity.birthday}}</p>
        <p><label>Sexe :</label> {{identity.sex === 'm' ? 'Masculin' : 'Féminin'}}</p>
        <p><label>Commune de naissance :</label> {{identity.birthPlace}}</p>
        <p><label>Département ou collectivité outre-mer de naissance :</label> PAS BRANCHE</p>
        <p><label>Pays de naissance :</label> PAS BRANCHE</p>
        <p><label>Nationalité :</label> PAS BRANCHE</p><!-- FR ou UE/UEEE ou Autre -->
        <p><label>Adresse :</label> {{identity.address}}</p>
        <p><label>Tel domicile :</label> {{identity.homePhoneNumber}}</p>
        <p><label>Tel portable :</label> {{identity.cellPhoneNumber}}</p>
        <p><label>Courriel :</label> {{identity.email}}</p>
        <h3 class="title is-5">Vous êtes actuellement :</h3>
        <p>A RAJOUTER</p>
        <h3 class="title is-5">Êtes-vous reconnu travailleur handicapé :</h3>
        <p>A RAJOUTER</p>
      </section>

      <section class="section section-level">
        <h1 class="title is-4">Rubrique 4 : Niveau de formation/Certification(s) obtenue(s) à la date de votre demande</h1>
        <p><label>Dernière classe suivie :</label> {{education.latestCourseLevel}}</p>
        <p><label>Titre ou diplôme le plus élevé obtenu en France :</label> {{education.latestDegree}}</p>
        <p><label>Autre certification obtenue en France :</label> A BRANCHER</p>
        <p><label>Attestation de comparabilité d'un diplôme délivré dans un pays étranger :</label> PAS BRANCHE</p>
        <p><label>Attestation de reconnaissance d'études/et ou de formation/s suivie/s à l'étranger :</label> PAS BRANCHE</p>
        <p><label>Partie(s) de certification professionnelle obtenue/s :</label> {{education.trainings.length ? 'Oui' : 'Non'}}</p>
        <p><label>Certification ou partie/s de certification professionnelle inscrite/s au Répertoire National des Certifications Professionnelles (RNCP) en rapport avec la certification professionnelle que vous souhaitez obtenir par la validation des acquis de l'expérience (VAE), :</label> {{education.trainings.join(', ')}}</p>
        <p><label>Formations courtes suivies dans le cadre de la formation continue :</label> {{education.relatedDegrees.join(', ')}}</p>
      </section>

      <section class="section section-experiences">
        <h1 class="title is-4">Rubrique 5 : Information concernant votre expérience en rapport direct avec la certification viséee</h1>
      </section>
      <section class="section section-sworn">
        <h1 class="title is-4">Rubrique 6 : Déclaration sur l'honneur</h1>
      </section>
      <section class="section section-sworn">
        <h1 class="title is-4">Rubrique 7 : Réservé à l'organisme certificateur (ne pas remplir)</h1>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  layout: 'recapitulatif',
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
</style>
