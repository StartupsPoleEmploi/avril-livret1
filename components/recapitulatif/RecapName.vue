<template>
  <span class="recap-cell cell-name">

    <p>Je me nomme <strong>{{identite.lastName}}</strong>
      <span v-for="firstName, index in identite.firstNames"><strong>{{firstName}}</strong>
        <span v-if="index < identite.firstNames.length-1">, </span></span> (c'est <span v-if="identite.sex=='m'">masculin</span><span v-else>féminin</span>) (Nom d'usage : {{identite.usageName}})</p>

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
