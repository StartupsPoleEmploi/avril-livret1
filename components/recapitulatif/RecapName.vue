<template>
  <span class="recap-cell cell-name">

    <p>
      Je me nomme <strong>{{identite.lastName}} {{identite.firstNames}}</strong> (c'est {{identite.sex=='m' ? 'masculin' : 'féminin'}}) <span v-if="identite.usageName">(Nom d'usage : {{identite.usageName}})</span></p>

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