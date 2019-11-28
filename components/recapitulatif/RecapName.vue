<template>
  <span class="recap-cell cell-name">

    <p>
      Je me nomme <strong>{{identite.lastName}} {{identite.firstNames}}</strong> <span v-if="identite.usageName">(Nom d'usage : {{identite.usageName}})</span></p>
    <p>Je suis de sexe {{identite.sex=='m' ? 'masculin' : 'féminin'}}</p>

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