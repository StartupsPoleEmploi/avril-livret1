<template>
  <span class="recap-cell cell-classe">
    <p v-if="!education.latestCourseLevel">Je n'ai pas encore renseigné ma dernière classe.</p>
    <p v-if="education.latestCourseLevel == '1'">Je suis allé jusqu'en <strong>Primaire, 6ème, 5ème, 4ème, 3ème, 1ère année de CAP ou BEP</strong>.</p>
    <p v-if="education.latestCourseLevel == '2'">Je suis allé jusqu'en <strong>2ème, 1ère, 2ème année de CAP ou BEP</strong>.</p>
    <p v-if="education.latestCourseLevel == '3'">Je suis allé jusqu'en <strong>Terminal</strong>.</p>
    <p v-if="education.latestCourseLevel == '4'">Je suis allé jusqu'en <strong>1ère ou 2ème année de l'enseignement supérieur</strong>.</p>
    <p v-if="education.latestCourseLevel == '5'">Je suis allé jusqu'en <strong>3ème année de l'enseignement supérieur</strong>.</p>
    <p v-if="education.latestCourseLevel == '6'">Je suis allé jusqu'en <strong>4ème ou 5ème année de l'enseignement supérieur</strong>.</p>
    <p v-if="education.latestCourseLevel == '7'">Je suis allé jusqu'en <strong>6ème année de l'enseignement supérieur</strong>.</p>

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
