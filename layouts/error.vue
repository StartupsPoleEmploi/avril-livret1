<template>
  <div class="container" style="padding: 3rem;">
    <h1 class="title is-1">
      <span v-if="error.statusCode === 404">La page n'a pas été trouvée</span>
      <span v-else>Une erreur est survenue</span>
    </h1>
    <p style="margin-bottom: 2rem;">Merci de réessayer plus tard.</p>
    <p class="has-text-centered">
      <a :href="backUrl">Revenir vers Avril</a>
    </p>
  </div>
</template>

<script>
  import {profileUrl} from '~/utils/url.js';

  export default {
    computed: {
      backUrl() {
        return profileUrl(this);
      },
    },
    props: ['error'],
    layout: 'recapitulatif'
  }
</script>