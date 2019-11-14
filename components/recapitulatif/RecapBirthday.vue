<template>
  <span class="recap-cell cell-birthday">

    <p>Je suis né<span v-if="identite.sex!='m'">e</span> le {{identite.birth.date}}</p>
    <p>à {{identite.birth.county}}, {{identite.birth.city}}, {{identite.birth.country}}</p>

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
