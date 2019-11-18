<template>
  <span class="recap-cell cell-classe">

    <p v-if="education.latestCourseLevel == 'A'">Je suis allé jusqu'en <strong>Primaire, 6ème, 5ème, 4ème, 3ème, 1ère année de CAP ou BEP</strong></p>
    <p v-if="education.latestCourseLevel == 'B'">Je suis allé jusqu'en <strong>2ème, 1ère, 2ème année de CAP ou BEP</strong></p>
    <p v-if="education.latestCourseLevel == 'C'">Je suis allé jusqu'en <strong>Terminal</strong></p>
    <p v-if="education.latestCourseLevel == 'D'">Je suis allé jusqu'en <strong>1ère ou 2ème année de l'enseignement supérieur</strong></p>
    <p v-if="education.latestCourseLevel == 'E'">Je suis allé jusqu'en <strong>3ème année de l'enseignement supérieur</strong></p>
    <p v-if="education.latestCourseLevel == 'F'">Je suis allé jusqu'en <strong>4ème ou 5ème année de l'enseignement supérieur</strong></p>
    <p v-if="education.latestCourseLevel == 'G'">Je suis allé jusqu'en <strong>6ème année de l'enseignement supérieur</strong></p>

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
