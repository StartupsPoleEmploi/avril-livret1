<template>
  <div>
    <Saving />
    <div class="container">

      <div class="avril-layout">
        <div class="avril-navigation">
          <div class="navigation-header">
            <a :href="backUrl" class="button is-default">
              <Back />
              Retour vers mon profil
            </a>
          </div>
          <div class="navigation-tabs">
            <h3 class="navigation-title title is-4">Dossier de recevabilité</h3>
            <h4 class="navigation-subtitle title is-5">{{certificationLabel}}</h4>
            <div class="navigation-progressbar progress__bar">
              <div class="progress__bar--suivi" :style="`width:${progress}%`"></div>
            </div>
            <div class="">
              {{progress}}% {{'complété' | pluralize(progress)}}
            </div>

            <Tabs></Tabs>

            <div class="section is-vertical">
              <nuxt-link v-if="!isTheEnd" to="/recapitulatif" class="button is-default is-fullwidth">
                Enregistrer mon dossier de recevabilité
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="avril-content">
          <Stepper v-if="!withoutStepper" />
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {capitalize, pluralize} from 'avril/js/utils/string';
  import {phoenixUrl} from '~/utils/url.js';

  import Back from 'avril/images/icons/back.svg';

  import Stepper from '~/components/Stepper.vue';
  import Tabs from '~/components/Tabs.vue';
  import Saving from '~/components/Saving.vue';

  export default {
    components: {
      Back,
      Saving,
      Stepper,
      Tabs,
    },
    computed: {
      backUrl() {
        return phoenixUrl({hash: this.$store.state.hash});
      },
      isTheEnd() {
        return this.$store.getters.isTheEnd;
      },
      progress() {
        return this.$store.getters.progress;
      },
      certificationLabel() {
        return this.$store.state.certificationLabel;
      },
      withoutStepper() {
        return this.$store.getters.currentTab === 'experiences'
          && !this.$store.getters['experiences/current'];
      },
    },
    head() {
      if (this.$store.getters.pageTitle) {
        return {
          titleTemplate: `${this.$store.getters.pageTitle} - %s`,
        }
      }
    },
    mounted() {
      if (this.$store.state.isReadOnly) {
        return this.$router.push({
          path: '/cerfa'
        })
      }
    },
    asyncData: async function() {
      console.log('coucou loulou')
      return {};
    }
  }
</script>

<style>
  html {
    font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
