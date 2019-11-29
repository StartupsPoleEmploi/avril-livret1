<template>
  <span class="recap-cell cell-name">

    <p v-if="identite.firstNames && identite.lastName">
      Je me nomme <strong>{{identite.lastName}} {{identite.firstNames}}</strong><span v-if="identite.usageName">(Nom d'usage : {{identite.usageName}})</span></p>
    <p v-else><strong>Je n'ai pas encore renseigné mon nom.</strong></p>
    <p>Je suis de sexe {{identite.sex ? (identite.sex === 'm' ? 'masculin' : 'féminin') : 'inconnu'}}.</p>

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