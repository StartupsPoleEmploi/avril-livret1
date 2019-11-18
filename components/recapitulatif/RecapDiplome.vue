<template>
  <span class="recap-cell cell-diplome">

    <p v-if="education.latestDegree == 'A'">Je n'ai <strong>aucun diplôme</strong></p>
    <p v-if="education.latestDegree == 'B'">J'ai un <strong>certificat d’étude primaire</strong></p>
    <p v-if="education.latestDegree == 'C'">J'ai un <strong>Brevet des collèges (BEPC, DNB), Certificat de Formation Générale (niveau V bis)</strong></p>
    <p v-if="education.latestDegree == 'D'">J'ai un <strong>CAP, BEP ou autre certification de niveau V (niveau CEC3 : 3)</strong></p>
    <p v-if="education.latestDegree == 'E'">J'ai un <strong>Baccalauréat général, technologique, professionnel, ESEU, DAEU, ou autre certification de niveau IV (niveau CEC : 4)</strong></p>
    <p v-if="education.latestDegree == 'F'">J'ai un <strong>DEUG, DUT, DEUST, BTS ou autre certification de niveau III (niveau. CEC : 5)</strong></p>
    <p v-if="education.latestDegree == 'G'">J'ai un <strong>Licence, licence professionnelle, Maîtrise ou autre certification de niveau II (niveau CEC : 6)</strong></p>
    <p v-if="education.latestDegree == 'H'">J'ai un <strong>DESS, Master, titre d’ingénieur ou autre certification de niveau I (niveau CEC : 7)</strong></p>
    <p v-if="education.latestDegree == 'I'">J'ai un <strong>Doctorat, DEA de niveau I (niveau CEC : 8)</strong></p>

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
