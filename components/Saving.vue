<template>
  <div v-show="isSaving" class="saving notification is-info">
    <p>Enregistrement en cours ... </p>
  </div>
</template>

<script>
export default {
  computed: {
    isSaving() {
      return this.$store.state.isSaving;
    },
  },
}
</script>

<style scoped>
.saving {
  position: fixed;
  top: 2rem;
  right: 2rem;
}
</style>
