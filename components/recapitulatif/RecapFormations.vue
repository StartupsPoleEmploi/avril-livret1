<template>
<div class="">
  <div class="recap-cell cell-formations" v-if="experiences.formationsContinues.length != 0">

    J'ai une formation de
    <span v-for="formation, index in experiences.formationsContinues">
      <span><strong>{{ formation }}</strong> <span v-if="index < experiences.formationsContinues.length-1">et de </span></span>
    </span>

  </div>
  <div class="recap-cell cell-classe" v-else>
    Je n'ai pas de formations
  </div>
</div>
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
