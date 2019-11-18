<template>

  <div class="navigation-tabs">

      <nuxt-link to="/formations"  :class="currentTab == 'formations' ? 'navigation-tab navigation-active is-vertical-center' : 'navigation-tab is-vertical-center'">
        <div>
          <span v-if="educationIsOk">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
            </svg>
          </span>
          <span class="title is-4">Ma formation</span>
        </div>
      </nuxt-link>

      <nuxt-link to="/experiences" :class="currentTab == 'experiences' ? 'navigation-tab navigation-active is-vertical-center' : 'navigation-tab is-vertical-center'">
        <span v-if="heures >= 1607">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
          </svg>
        </span>
        <span class="title is-4">Mes expériences professionnelles</span>
        <div class="progress-vision">
          <div class="progress__bar --hours"><div class="progress__bar--suivi" :style="`width:${experiencesProgress}%`"></div></div>
          <p v-if="experiencesProgress < 100">Vous avez ajouté <strong>{{experiencesTotalHours}}</strong> {{heure | pluralize(experiencesTotalHours)}} sur {{experiencesMinHours}} demandées.</p>
          <p v-if="experiencesProgress >= 100">Vous avez renseigné <strong>{{experiencesTotalHours}}</strong> {{heure | pluralize(experiencesTotalHours)}}.</p>
        </div>
      </nuxt-link>

      <nuxt-link to="/identite"  :class="currentTab == 'identite' ? 'navigation-tab navigation-active is-vertical-center' : 'navigation-tab is-vertical-center'">
        <div>
          <span v-if="identityIsOk">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
            </svg>
          </span>
          <span class="title is-4">Mon identité</span>
        </div>
      </nuxt-link>

    </div>


</template>
<script>
import _ from 'lodash';
import {BOOKLET_MIN_HOURS} from '../constants/index';

export default {
  computed: {
    educationIsOk(){
      return this.$store.getters['experiences/education'] == 100;
    },
    identityIsOk(){
      return this.$store.getters['experiences/identity'] == 100;
    },
    experiencesProgress () {
      return this.$store.getters['experiences/progress'];
    },
    experiencesTotalHours() {
      return this.$store.getters['experiences/totalHours'];
    },
    experiencesMinHours() {
      return BOOKLET_MIN_HOURS;
    },
    currentTab () {
      return this.$store.state.currentTab;
    }
  },
}
</script>
