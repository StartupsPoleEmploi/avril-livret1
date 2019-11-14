<template>
  <span class="recap-cell cell-classe">

    <p v-if="experiences.formations.classe == 'A'">Je n'ai aucun diplôme</p>
    <p v-if="experiences.formations.classe == 'B'">J'ai un certificat d’études primaires</p>
    <p v-if="experiences.formations.classe == 'C'">J'ai un Brevet des collèges (BEPC, DNB), Certificat de Formation Générale (niveau V bis)</p>
    <p v-if="experiences.formations.classe == 'D'">J'ai un CAP, BEP ou autre certification de niveau V (niveau CEC3 : 3)</p>
    <p v-if="experiences.formations.classe == 'E'">J'ai un Baccalauréat général, technologique, professionnel, ESEU, DAEU, ou autre certification de niveau IV (niveau CEC : 4)</p>
    <p v-if="experiences.formations.classe == 'F'">J'ai un DEUG, DUT, DEUST, BTS ou autre certification de niveau III (niveau. CEC : 5)</p>
    <p v-if="experiences.formations.classe == 'G'">J'ai un Licence, licence professionnelle, Maîtrise ou autre certification de niveau II (niveau CEC : 6)</p>
    <p v-if="experiences.formations.classe == 'H'">J'ai un DESS, Master, titre d’ingénieur ou autre certification de niveau I (niveau CEC : 7)</p>
    <p v-if="experiences.formations.classe == 'I'">J'ai un Doctorat, DEA de niveau I (niveau CEC : 8)</p>

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
