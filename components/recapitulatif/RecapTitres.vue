<template>
  <div class="recap-cell cell-titres">
    J'ai un diplôme de
    <span v-for="titre, index in education.relatedDegrees">
      <span><strong>{{ titre }}</strong> <span v-if="index < education.relatedDegrees.length-1">et de </span></span>
    </span>

  </div>
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
