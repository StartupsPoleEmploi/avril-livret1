<template>
  <span class="recap-cell cell-contact">

    <p>Mon email : {{identite.email}}</p>
    <p v-if="homePhoneNumber">{{identite.homePhoneNumber}}</p>
    <p v-else>Je n'ai pas renseigné mon numéro de téléphone fixe</p>
    <p v-if="cellPhoneNumber">{{identite.cellPhoneNumber}}</p>
    <p v-else>Je n'ai pas renseigné mon numéro de téléphone mobile</p>

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
