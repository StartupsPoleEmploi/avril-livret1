<template>
  <span class="recap-cell cell-residence">

    <p>J'habite {{identite.address.streetNumber}} {{identite.address.streetType}} {{identite.address.streetName}}, {{identite.address.postalCode}} {{identite.address.city}} ({{identite.address.country}})</p>
    <p v-if="identite.address.isDomTom == true">C'est dans les DOM TOM</p>

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
