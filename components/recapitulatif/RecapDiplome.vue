<template>
  <span class="recap-cell cell-diplome">

    <p v-if="experiences.formations.classe == 'A'">Je n'ai <strong>aucun diplôme</strong></p>
    <p v-if="experiences.formations.classe == 'B'">J'ai un <strong>certificat d’étude primaire</strong></p>
    <p v-if="experiences.formations.classe == 'C'">J'ai un <strong>Brevet des collèges (BEPC, DNB), Certificat de Formation Générale (niveau V bis)</strong></p>
    <p v-if="experiences.formations.classe == 'D'">J'ai un <strong>CAP, BEP ou autre certification de niveau V (niveau CEC3 : 3)</strong></p>
    <p v-if="experiences.formations.classe == 'E'">J'ai un <strong>Baccalauréat général, technologique, professionnel, ESEU, DAEU, ou autre certification de niveau IV (niveau CEC : 4)</strong></p>
    <p v-if="experiences.formations.classe == 'F'">J'ai un <strong>DEUG, DUT, DEUST, BTS ou autre certification de niveau III (niveau. CEC : 5)</strong></p>
    <p v-if="experiences.formations.classe == 'G'">J'ai un <strong>Licence, licence professionnelle, Maîtrise ou autre certification de niveau II (niveau CEC : 6)</strong></p>
    <p v-if="experiences.formations.classe == 'H'">J'ai un <strong>DESS, Master, titre d’ingénieur ou autre certification de niveau I (niveau CEC : 7)</strong></p>
    <p v-if="experiences.formations.classe == 'I'">J'ai un <strong>Doctorat, DEA de niveau I (niveau CEC : 8)</strong></p>

  </span>
</template>

<script>
export default {
  computed: {
    experiences () {
      return this.$store.state.experiences
    },
  },
}

</script>

<style>

</style>
