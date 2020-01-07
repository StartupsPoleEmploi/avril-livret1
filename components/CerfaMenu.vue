<template>
  <div class="action-buttons">
    <div class="columns">
      <div class="column">
        <a v-if="backUrl" class="is-ok button is-default" :href="backUrl">Retour vers Avril</a>
      </div>
      <div class="column">
        <nuxt-link to="/" class="button is-default is-fullwidth has-text-centered">
          Je dois encore modifier certaines informations
        </nuxt-link>
      </div>
      <div class="column">
        <form @submit="addBody" method="POST" action="/cerfa.pdf" class="download" target="_blank">
          <input type="hidden" name="body" :value="htmlBody">
          <button type="submit" class="button is-dark is-pulled-right" :disabled="!!htmlBody">
            {{htmlBody ? 'Téléchargement ...' : 'Télécharger le PDF'}}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {phoenixUrl} from '~/utils/url.js';

export default {
  computed: {
    backUrl() {
      return phoenixUrl(this.$store.state.hash)
    },
  },
  data() {
    return {
      htmlBody: null,
    }
  },
  methods: {
    addBody(e) {
      this.htmlBody = document.documentElement.outerHTML.replace(/<script.*?<\/script>/g, '');
      setTimeout(() => {
        this.htmlBody = null;
      }, 500);
    },
  },
}
</script>