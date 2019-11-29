<template>
  <span class="recap-cell cell-residence">
    <p v-if="identite.address">J'habite {{identite.address}}.</p>
    <p v-else><strong>Je n'ai pas encore renseigné mon adresse.</strong></p>
  </span>
</template>

<script>
export default {
  computed: {
    identite () {
      return this.$store.state.identity
    },
  },
}

</script>

<style>

</style>
