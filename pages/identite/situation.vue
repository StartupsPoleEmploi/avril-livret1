<template>
  <div class="form is-horizontal">
    <div class="form-fields fields">
      <div class="field">
        <h3 class="title is-5">Je suis actuellement :</h3>
        <RadioList
          :value="currentSituationActivity"
          :options="activity"
          :click="addCurrentSituationActivity"
        />
      </div>

      <div class="field" v-if="currentSituationActivity == 'working'">
        <h3 class="title is-5">Avec quel statut ?</h3>
        <RadioList
          :value="currentSituationWorkingStatus"
          :options="workingStatus"
          :click="addCurrentSituationWorkingStatus"
        />
      </div>
      <div class="field" v-if="currentSituationActivity == 'jobseeking'">
        <h3 class="title is-5">Je suis inscrit à Pôle emploi :</h3>
        <RadioList
          :value="currentSituationJobSeekingIsPE"
          :click="addCurrentSituationJobSeekingIsPE"
          boolean
          inline
        />
      </div>
      <div class="field" v-if="currentSituationActivity == 'jobseeking' && currentSituationJobSeekingIsPE">
        <h3 class="title is-5">Je suis indemnisé :</h3>
        <RadioList
          :value="currentSituationJobSeekingSubvention"
          :click="addCurrentSituationJobSeekingSubvention"
          :options="subvention"
        />
      </div>
      <div class="field">
        <h3 class="title is-5">Je suis reconnu travailleur handicapé :</h3>
        <RadioList
          :value="isHandicapped"
          :click="addIsHandicapped"
          boolean
          inline
        />
      </div>
      <div class="form-field-action field">
        <div class="control">
          <nuxt-link to="identite" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="identite" class="is-ok button is-dark is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import helpLoaderMixin from '~/mixins/helpLoader.js';
import RadioList from "~/components/RadioList.vue";

import possibleAnswers from '~/contents/data/currentSituation';

export default {
  mixins: [helpLoaderMixin],
  components: {
    RadioList,
  },
  computed: {
    currentSituationActivity() {
      return this.$store.state.identity.currentSituation.activity;
    },
    currentSituationWorkingStatus() {
      return this.$store.state.identity.currentSituation.workingStatus;
    },
    currentSituationJobSeekingIsPE() {
      return this.$store.state.identity.currentSituation.jobSeekingIsPE;
    },
    currentSituationJobSeekingSubvention() {
      return this.$store.state.identity.currentSituation.jobSeekingSubvention;
    },
    isHandicapped() {
      return this.$store.state.identity.isHandicapped;
    },
  },
  data() {
    const {
      activity,
      workingStatus,
      subvention,
    } = possibleAnswers;
    return {
      activity,
      workingStatus,
      subvention,
    }
  },
  methods: {
    addCurrentSituationActivity: function(value) {
      this.$store.commit('identity/addCurrentSituationActivity', value)
    },
    addCurrentSituationWorkingStatus: function(value) {
      console.log(value)
      this.$store.commit('identity/addCurrentSituationWorkingStatus', value)
    },
    addCurrentSituationJobSeekingIsPE: function(value) {
      console.log(value)
      this.$store.commit('identity/addCurrentSituationJobSeekingIsPE', value)
    },
    addCurrentSituationJobSeekingSubvention: function(value) {
      this.$store.commit('identity/addCurrentSituationJobSeekingSubvention', value)
    },
    addIsHandicapped: function(value) {
      this.$store.commit('identity/addIsHandicapped', value)
    },
  },
}
</script>