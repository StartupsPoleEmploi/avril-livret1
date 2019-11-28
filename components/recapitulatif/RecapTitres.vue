<template>
  <div v-if="relatedDegrees.length" class="recap-cell cell-titres">
    J'ai un diplôme de
    <span v-for="titre, index in relatedDegrees">
      <span><strong>{{ titre }}</strong> <span v-if="index < relatedDegrees.length-1">et de </span></span>
    </span>
  </div>
  <div v-else>
    Je n'ai pas de diplôme supplémentaire.
  </div>
</template>

<script>
export default {
  computed: {
    relatedDegrees () {
      return this.$store.state.education.relatedDegrees
    },
  },
}

</script>

<style>

</style>
