<template>
  <span class="recap-cell cell-contact">

    <p v-if="identite.email">Mon email : <strong>{{identite.email}}</strong></p>
    <p v-else><strong>Je n'ai pas encore renseigné mon email.</strong></p>
    <p v-if="identite.homePhoneNumber">Numéro de téléphone fixe : {{identite.homePhoneNumber}}.</p>
    <p v-else>Je n'ai pas renseigné mon numéro de téléphone fixe.</p>
    <p v-if="identite.cellPhoneNumber">Numéro de téléphone portable : {{identite.cellPhoneNumber}}.</p>
    <p v-else>Je n'ai pas renseigné mon numéro de téléphone mobile.</p>

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
