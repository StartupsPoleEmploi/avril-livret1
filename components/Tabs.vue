<template>

  <div class="navigation-tabs">
      <nuxt-link to="/formations" class="navigation-tab is-vertical-center" :class="currentTab == 'formations' ? 'navigation-active' : ''">
        <Check v-if="educationProgress === 100" />
        <span class="title is-4">Ma formation</span>
      </nuxt-link>

      <nuxt-link to="/experiences" class="navigation-tab is-vertical-center" :class="currentTab == 'experiences' ? 'navigation-active' : ''">
        <Check v-if="experiencesProgress === 100" />
        <span class="title is-4">Mes expériences professionnelles</span>
        <div class="progress-vision">
          <div class="progress__bar --hours"><div class="progress__bar--suivi" :style="`width:${experiencesProgress}%`"></div></div>
          <p v-if="experiencesProgress < 100">
            Vous avez ajouté <strong>{{experiencesTotalHours}}</strong> {{'heure' | pluralize(experiencesTotalHours)}} sur {{experiencesMinHours}} demandées.
          </p>
          <p v-else>
            Vous avez renseigné <strong>{{experiencesTotalHours}}</strong> {{'heure' | pluralize(experiencesTotalHours)}}.
          </p>
        </div>
      </nuxt-link>

      <nuxt-link to="/identite" class="navigation-tab is-vertical-center" :class="currentTab == 'identite' ? 'navigation-active' : ''">
        <Check v-if="identityProgress === 100" />
        <span class="title is-4">Mon identité</span>
      </nuxt-link>
    </div>


</template>
<script>
import Check from './svg/Check';
import {BOOKLET_MIN_HOURS} from '../constants/index';

export default {
  components: {
    Check,
  },
  computed: {
    educationProgress() {
      return this.$store.getters['education/progress'];
    },
    identityProgress() {
      return this.$store.getters['identity/progress'];
    },
    experiencesProgress() {
      return this.$store.getters['experiences/progress'];
    },
    experiencesTotalHours() {
      return this.$store.getters['experiences/totalHours'];
    },
    experiencesMinHours() {
      return BOOKLET_MIN_HOURS;
    },
    currentTab () {
      return this.$store.getters.currentTab;
    }
  },
}
</script>
