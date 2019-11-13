<template>
  <span class="recap-cell cell-classe">

    <p v-if="experiences.formations.classe == 'A'">Je suis allé jusqu'en Primaire, 6ème, 5ème, 4ème, 3ème, 1ère année de CAP ou BEP</p>
    <p v-if="experiences.formations.classe == 'B'">Je suis allé jusqu'en 2ème, 1ère, 2ème année de CAP ou BEP</p>
    <p v-if="experiences.formations.classe == 'C'">Je suis allé jusqu'en Terminal</p>
    <p v-if="experiences.formations.classe == 'D'">Je suis allé jusqu'en 1ère ou 2ème année de l'enseignement supérieur</p>
    <p v-if="experiences.formations.classe == 'E'">Je suis allé jusqu'en 3ème année de l'enseignement supérieur</p>
    <p v-if="experiences.formations.classe == 'F'">Je suis allé jusqu'en 4ème ou 5ème année de l'enseignement supérieur</p>
    <p v-if="experiences.formations.classe == 'G'">Je suis allé jusqu'en 6ème année de l'enseignement supérieur</p>

  </span>
</template>

<script>
export default {
  computed: {
    experiences () {
      return this.$store.state.experiences
    },
  },
}

</script>

<style>

</style>
