<template>
  <div>
    <Saving />
    <div class="container">

      <div class="avril-layout">
        <div class="avril-aside">
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <div class="aside-section is-hidden-touch">
            <a :href="backUrl" class="button is-default is-wrapped">
              <Back />
              Retour vers mon profil
            </a>
          </div>
          <div class="aside-section">
            <h3 class="title is-4">Dossier de recevabilité</h3>
            <h4 class="subtitle">{{certificationLabel}}</h4>
            <div class="progress-bar is-hidden-touch">
              <div class="bar" :style="`width:${progress}%`"></div>
            </div>
            <div class="progress-label">
              {{progress}}% {{'complété' | pluralize(progress)}}
            </div>
          </div>

          <div class="aside-section is-hidden-touch">
            <Tabs></Tabs>
          </div>
          <div class="aside-section is-hidden-touch">
            <nuxt-link v-if="!isTheEnd" to="/recapitulatif" class="button is-default is-wrapped">
              Enregistrer mon dossier de recevabilité
            </nuxt-link>
          </div>
          <div class="navbar-menu is-hidden-desktop">
            <a :href="backUrl" class="navbar-item">
              <!-- <Back /> -->
              Retour vers mon profil
            </a>
            <nuxt-link to="/recapitulatif" class="navbar-item is-primary">
              Enregistrer mon dossier de recevabilité
            </nuxt-link>

            <hr class="navbar-divider">
            <div class="navbar-item has-dropdown is-hoverable">
              <nuxt-link to="/formations" class="navbar-link">
                Ma formation
              </nuxt-link>

              <div class="navbar-dropdown">
                <nuxt-link to="/formations" class="navbar-item">
                  Dernière formation
                </nuxt-link>
                <nuxt-link to="/formations/diplome" class="navbar-item">
                  Niveau
                </nuxt-link>
                <nuxt-link to="/formations/rncp" class="navbar-item">
                  Diplôme(s)
                </nuxt-link>
                <nuxt-link to="/formations/formations" class="navbar-item">
                  Formations
                </nuxt-link>
              </div>
            </div>
            <hr class="navbar-divider">
            <div class="navbar-item has-dropdown is-hoverable">
              <nuxt-link to="/experiences" class="navbar-link">
                Mes expériences professionnelles
              </nuxt-link>

              <div class="navbar-dropdown">
                <nuxt-link to="/experiences/fonction" class="navbar-item">
                  Fonction
                </nuxt-link>
                <nuxt-link to="/experiences/famille" class="navbar-item">
                  Famille pro
                </nuxt-link>
                <nuxt-link to="/experiences/statut" class="navbar-item">
                  Statut
                </nuxt-link>
                <nuxt-link to="/experiences/precision" class="navbar-item">
                  Activités
                </nuxt-link>
                <nuxt-link to="/experiences/periode" class="navbar-item">
                  Période
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
  }
</script>
