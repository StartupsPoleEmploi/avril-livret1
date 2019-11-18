<template>
  <span class="recap-cell cell-classe">

    <p v-if="experiences.latestDegree == 'A'">Je suis allé jusqu'en <strong>Primaire, 6ème, 5ème, 4ème, 3ème, 1ère année de CAP ou BEP</strong></p>
    <p v-if="experiences.latestDegree == 'B'">Je suis allé jusqu'en <strong>2ème, 1ère, 2ème année de CAP ou BEP</strong></p>
    <p v-if="experiences.latestDegree == 'C'">Je suis allé jusqu'en <strong>Terminal</strong></p>
    <p v-if="experiences.latestDegree == 'D'">Je suis allé jusqu'en <strong>1ère ou 2ème année de l'enseignement supérieur</strong></p>
    <p v-if="experiences.latestDegree == 'E'">Je suis allé jusqu'en <strong>3ème année de l'enseignement supérieur</strong></p>
    <p v-if="experiences.latestDegree == 'F'">Je suis allé jusqu'en <strong>4ème ou 5ème année de l'enseignement supérieur</strong></p>
    <p v-if="experiences.latestDegree == 'G'">Je suis allé jusqu'en <strong>6ème année de l'enseignement supérieur</strong></p>

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
