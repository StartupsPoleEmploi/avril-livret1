<template>
  <span class="recap-cell cell-diplome">

    <p v-if="!education.latestDegree">Je n'ai pas encore renseigné mon diplôme le plus élevé.</p>
    <p v-if="education.latestDegree == '1'">Je n'ai <strong>aucun diplôme</strong>.</p>
    <p v-if="education.latestDegree == '2'">J'ai un <strong>certificat d’étude primaire</strong>.</p>
    <p v-if="education.latestDegree == '3'">J'ai un <strong>Brevet des collèges (BEPC, DNB), Certificat de Formation Générale (niveau V bis)</strong>.</p>
    <p v-if="education.latestDegree == '4'">J'ai un <strong>CAP, BEP ou autre certification de niveau V (niveau CEC3 : 3)</strong>.</p>
    <p v-if="education.latestDegree == '5'">J'ai un <strong>Baccalauréat général, technologique, professionnel, ESEU, DAEU, ou autre certification de niveau IV (niveau CEC : 4)</strong>.</p>
    <p v-if="education.latestDegree == '6'">J'ai un <strong>DEUG, DUT, DEUST, BTS ou autre certification de niveau III (niveau. CEC : 5)</strong>.</p>
    <p v-if="education.latestDegree == '7'">J'ai un <strong>Licence, licence professionnelle, Maîtrise ou autre certification de niveau II (niveau CEC : 6)</strong>.</p>
    <p v-if="education.latestDegree == '8'">J'ai un <strong>DESS, Master, titre d’ingénieur ou autre certification de niveau I (niveau CEC : 7)</strong>.</p>
    <p v-if="education.latestDegree == '9'">J'ai un <strong>Doctorat, DEA de niveau I (niveau CEC : 8)</strong>.</p>
    <p v-if="education.latestDegree == '10'">J'ai un <strong>Certificat de qualification professionnelle (CQP)</strong>.</p>
    <p v-if="education.latestDegree == '11'">J'ai un <strong>Certificat de qualification professionnelle inter-branches (CQPI)</strong>.</p>

  </span>
</template>

<script>
export default {
  computed: {
    education () {
      return this.$store.state.education
    },
  },
}

</script>

<style>

</style>
