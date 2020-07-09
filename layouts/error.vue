<template>
  <div class="container content has-text-centered" style="padding: 3rem;">
    <a :href="backUrl" class="logo"><Logo /></a>
    <h1 class="title is-1">
      <span v-if="error.statusCode === 404">404 : La page n'a pas été trouvée</span>
      <span v-else>500 : Une erreur est survenue</span>
    </h1>
    <p style="margin-bottom: 2rem;">Merci de réessayer plus tard.</p>
    <p>
      <a :href="backUrl" class="button is-primary">
        <Back />
        Revenir vers Avril
      </a>
    </p>
  </div>
</template>

<script>
  import {profileUrl} from '~/utils/url.js';
  import Logo from 'avril/images/avril-logo.svg';
  import Back from 'avril/images/icons/back.svg';
  export default {
    computed: {
      backUrl() {
        return profileUrl(this);
      },
    },
    components: {
      Back,
      Logo,
    },
    props: ['error'],
    layout: 'recapitulatif'
  }
</script>

<style lang="scss" scoped>
  .container {
    a.logo {
      svg {
        height: 2rem;
        padding:0;
      }
    }
  }
</style>