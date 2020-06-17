<template>
  <div class="action-buttons section" style="padding-left: 0; padding-right: 0;">
    <div class="columns">
      <div class="column">
        <a v-if="backUrl" class="is-ok button is-text" :href="backUrl">
          <Back />
          Retour vers {{isEditable ? 'mon profil' : 'Avril'}}
        </a>
      </div>
      <div class="column" v-if="isEditable">
        <nuxt-link to="/" class="button is-text is-fullwidth has-text-centered">
          <Pencil />
          Je dois encore modifier certaines informations
        </nuxt-link>
      </div>
      <div class="column">
        <form @submit="addBody" method="POST" action="cerfa.pdf" class="download" target="print_popup">
          <input type="hidden" name="body" :value="htmlBody">
          <button download="cerfa.pdf" type="submit" class="button is-primary is-pulled-right" :disabled="!!htmlBody">
            {{htmlBody ? 'Téléchargement ...' : 'Télécharger le PDF'}}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {phoenixUrl} from '~/utils/url.js';
  import Back from 'avril/images/icons/back.svg';
  import Pencil from 'avril/images/icons/pencil.svg';

  export default {
    components: {
      Back,
      Pencil,
    },
    computed: {
      isEditable() {
        return !this.$store.state.isReadOnly;
      },
      backUrl() {
        if (this.isEditable) {
          return phoenixUrl({hash: this.$store.state.hash})
        } else {
          return phoenixUrl({delegate_hash: this.$store.state.delegateHash})
        }
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
        window.open('about:blank','print_popup','width=1000,height=800');
        setTimeout(() => {
          this.htmlBody = null;
          if (this.isEditable) {
            window.location = this.backUrl;
          }
        }, 500);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .action-buttons {
    margin: 3rem 0;
  }
</style>