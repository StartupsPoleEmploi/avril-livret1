<template>
  <span class="recap-cell cell-residence">
    <p>J'habite {{identite.address}}</p>
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
