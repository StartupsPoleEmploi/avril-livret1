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
            <div class="navigation-titles">
              <h3 class="title is-4">Dossier de recevabilité</h3>
              <h4 class="title is-5">{{certificationLabel}}</h4>
              <div class="progress-bar">
                <div class="bar" :style="`width:${progress}%`"></div>
              </div>
              <div>
                {{progress}}% {{'complété' | pluralize(progress)}}
              </div>
            </div>

            <Tabs></Tabs>

            <div class="section is-vertical is-small">
              <div class="navigation-titles">
                <nuxt-link v-if="!isTheEnd" to="/recapitulatif" class="button is-default is-wrapped">
                  Enregistrer mon dossier de recevabilité
                </nuxt-link>
              </div>
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

<style lang="scss" scoped>
  .navigation-titles {
    margin-right: 2rem;
  }

</style>
