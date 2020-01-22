<template>
  <div style="padding: 2rem; text-align: center;">
    <h1 class="title">Page test d'Hotjar</h1>
    <nuxt-link to="/" class="button is-dark">{{hasHash ? 'Revenir à la page principale' : 'Démarrer un livret 1 sans sauvegarde'}}</nuxt-link>
  </div>
</template>
<script type="text/javascript">
  export default {
    layout: 'recapitulatif',
    computed: {
      hasHash: function() {
        return !!this.$store.state.hash
      },
    },
  }
</script>