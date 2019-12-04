<template>
  <span class="recap-cell cell-classe">
    <p v-if="!education.latestCourseLevel">Je n'ai pas encore renseigné ma dernière classe.</p>
    <p v-else>Je suis allé jusqu'en <strong>{{latestCourseLevelLabel}}</strong></p>
  </span>
</template>

<script>
export default {
  computed: {
    education () {
      return this.$store.state.education
    },
    latestCourseLevelLabel() {
      return this.$store.getters['education/latestCourseLevelLabel'];
    },
  },
}

</script>

<style>

</style>
