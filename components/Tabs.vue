<template>

  <div class="navigation-tabs">

      <nuxt-link to="/formations"  :class="tab == 1 ? 'navigation-tab navigation-active is-vertical-center' : 'navigation-tab is-vertical-center'">
        <div>
          <div class="title is-4">Ma formation</div>
        </div>
      </nuxt-link>

      <nuxt-link to="/experiences" :class="tab == 0 ? 'navigation-tab navigation-active is-vertical-center' : 'navigation-tab is-vertical-center'">
        <div class="title is-4">Mes expériences professionnelles</div>
        <div class="progress-vision">
          <div class="progress__bar --hours"><div class="progress__bar--suivi" :style="`width:${pourcentage}%`"></div></div>
          <p v-if="heures < 1607">Vous avez ajouté <strong>{{Math.round(heures)}}</strong> heure<span v-if="(heures) > 0">s</span> sur 1607 demandées.</p>
          <p v-if="heures >= 1607">Vous avez renseigné <strong>{{Math.round(heures)}}</strong> heure<span v-if="heures > 0">s</span>.</p>
        </div>
      </nuxt-link>

    </div>


</template>
<script>
import _ from 'lodash';

export default {
  computed: {
    heures () {
      return this.$store.state.experiences.heures
    },
    monDossier () {
      return this.$store.state.application.monDossier
    },
    pourcentage () {
      if( (this.$store.state.experiences.heures*100)/1607 > 100 )
        return 100
      else
        return (this.$store.state.experiences.heures*100)/1607
    },
    tab () {
      return this.$store.state.application.tab
    }
  },
}
</script>
