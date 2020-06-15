<template>
  <div class="navigation-tabs">
    <nuxt-link to="/formations" class="navigation-tab is-vertical-center" :class="currentTab == 'formations' ? 'navigation-active' : ''">
      <Check v-if="educationProgress === 100" />
      <span class="title is-4">Ma formation</span>
    </nuxt-link>

    <nuxt-link to="/experiences" class="navigation-tab is-vertical-center" :class="currentTab == 'experiences' ? 'navigation-active' : ''">
      <Check v-if="experiencesProgress === 100" />
      <span class="title is-4">Mes expériences professionnelles</span>
      <div class="section is-vertical is-small">
        <div class="progress-bar"><div class="bar" :style="`width:${experiencesProgress}%`"></div></div>
        <p v-if="experiencesProgress < 100">
          <strong>{{experiencesTotalHours}}</strong> {{'heure renseignée' | pluralize(experiencesTotalHours)}} sur {{experiencesMinHours}} demandées.
        </p>
        <p v-else>
          <strong>{{experiencesTotalHours}}</strong> {{'heure renseignée' | pluralize(experiencesTotalHours)}}.
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
  import Check from 'avril/images/icons/check.svg';

  import {BOOKLET_MIN_HOURS} from '~/constants/index';

  export default {
    components: {
      Check,
    },
    computed: {
      educationProgress() {
        return this.$store.getters['education/progress'];
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

<style lang="scss" scoped>
  @import '~assets/variables';

  .navigation-tab {
    svg {
      fill: avril-color('marine');
      height: 1rem;
    }
  }
</style>
