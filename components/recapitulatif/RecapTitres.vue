<template>
  <div class="recap-cell cell-classe">
    J'ai un diplôme de
    <span v-for="titre, index in experiences.titres">
      <span>{{ titre }} <span v-if="index < experiences.titres.length-1">&amp; de</span></span>
    </span>

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
