<template>
  <span class="recap-cell cell-diplome">

    <p v-if="!education.latestDegree">Je n'ai pas encore renseigné mon diplôme le plus élevé.</p>
    <p v-else>{{education.latestDegree > 1 ? 'J\'ai un' : 'Je n\'ai'}} <strong>{{latestDegreeLabel}}</strong></p>
  </span>
</template>

<script>
export default {
  computed: {
    education () {
      return this.$store.state.education
    },
    latestDegreeLabel() {
      return this.$store.getters['education/latestDegreeLabel'];
    },
  },
}

</script>

<style>

</style>
