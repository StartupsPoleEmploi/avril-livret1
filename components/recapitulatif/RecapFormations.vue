<template>
<div class="">
  <div class="recap-cell cell-formations" v-if="education.trainings.length != 0">

    J'ai suivi une formation de
    <span v-for="formation, index in education.trainings">
      <span><strong>{{ formation }}</strong> <span v-if="index < education.trainings.length-1">et de </span></span>
    </span>

  </div>
  <div class="recap-cell cell-classe" v-else>
    Je n'ai pas de formation supplémentaire.
  </div>
</div>
</template>

<script>
export default {
  computed: {
    education() {
      return this.$store.state.education
    },
  },
}

</script>

<style>

</style>
