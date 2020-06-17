<template>
  <div>
    <Saving />
    <div class="container">
      <div class="avril-layout">
        <div class="avril-aside">
          <a @click="toggleMobileMenu()" role="button" class="navbar-burger burger" :class="showMobileMenu ? 'is-active' : ''" aria-label="menu" :aria-expanded="`${showMobileMenu}`" data-target="mobile-menu">
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
          <div id="mobile-menu" class="navbar-menu is-hidden-desktop" :class="showMobileMenu ? 'is-active' : ''">
            <div class="navbar-item">
              <a :href="backUrl" class="button is-default">
                <Back />
                Retour vers mon profil
              </a>
            </div>
            <hr class="navbar-divider" />
            <div class="navbar-item has-dropdown is-hoverable">
              <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/formations" class="navbar-link">
                Ma formation
              </nuxt-link>

              <div class="navbar-dropdown">
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/formations" class="navbar-item">
                  Dernière formation
                </nuxt-link>
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/formations/diplome" class="navbar-item">
                  Niveau
                </nuxt-link>
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/formations/rncp" class="navbar-item">
                  Diplôme(s)
                </nuxt-link>
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/formations/formations" class="navbar-item">
                  Formations
                </nuxt-link>
              </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/experiences" class="navbar-link">
                Mes expériences professionnelles
              </nuxt-link>

              <div class="navbar-dropdown" v-if="currentExperience">
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/experiences/fonction" class="navbar-item">
                  Fonction
                </nuxt-link>
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/experiences/famille" class="navbar-item">
                  Famille pro
                </nuxt-link>
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/experiences/statut" class="navbar-item">
                  Statut
                </nuxt-link>
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/experiences/precision" class="navbar-item">
                  Activités
                </nuxt-link>
                <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/experiences/periode" class="navbar-item">
                  Période
                </nuxt-link>
              </div>
            </div>
            <hr class="navbar-divider" />
            <div class="navbar-item">
              <nuxt-link v-on:click.native="toggleMobileMenu(false)" to="/recapitulatif" class="button" :class="progress === 100 ? 'is-dark' : 'is-default'">
                Enregistrer mon dossier de recevabilité
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="avril-content" @click="toggleMobileMenu(false)">
          <Stepper v-if="!withoutStepper" />
            <div class="form">
              <div class="form-fields">
                <nuxt />
              </div>
              <Help :content="helpContent" />
            </div>

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
  import Help from '~/components/Help.vue';

  export default {
    components: {
      Back,
      Help,
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
      currentExperience() {
        return this.$store.getters['experiences/current'];
      },
      helpContent() {
        return this.$store.state.helpContent;
      },
      withoutStepper() {
        return this.$store.getters.currentTab === 'experiences'
          && !this.$store.getters['experiences/current'];
      },
    },
    data: function() {
      return {
        showMobileMenu: false,
      }
    },
    head() {
      if (this.$store.getters.pageTitle) {
        return {
          titleTemplate: `${this.$store.getters.pageTitle} - %s`,
        }
      }
    },
    middleware: async function({store, route}) {
      try {
        const helpContent = await import(`~/contents/help${route.path}${route.path.split('/').length == 2 ? '/index' : ''}.md`);
        store.commit('setHelpContent', helpContent.default);
      } catch(e) {}
    },
    mounted() {
      if (this.$store.state.isReadOnly) {
        return this.$router.push({
          path: '/cerfa'
        })
      }
    },
    methods: {
      toggleMobileMenu: function(value) {
        this.showMobileMenu = typeof value === 'undefined' ? !this.showMobileMenu : value;
      },
    },
  }
</script>
