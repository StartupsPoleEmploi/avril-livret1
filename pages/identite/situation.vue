<template>
  <div class="form is-horizontal">
    <div class="form-fields fields">
      <div class="field">
        <h3 class="title is-5">Je suis reconnu travailleur handicapé :</h3>
        <RadioList
          :value="isHandicapped"
          :click="addIsHandicapped"
          boolean
          inline
        />
      </div>
      <div class="field">
        <h3 class="title is-5">Je suis actuellement :</h3>
        <RadioList
          key="statusQuestion"
          :value="currentSituationStatus"
          :options="status"
          :click="addCurrentSituationStatus"
        />
      </div>

      <div class="field" v-if="isWorking">
        <h3 class="title is-5">Avec quel statut ?</h3>
        <RadioList
          key="workingSubQuestion"
          :value="currentSituationEmploymentType"
          :options="employmentType"
          :click="addCurrentSituationEmploymentType"
        />
      </div>
      <div class="field" v-if="isJobSeeking">
        <h3 class="title is-5">Je suis inscrit à Pôle emploi :</h3>
        <RadioList
          key="jobseekingSubQuestion"
          :value="currentSituationRegisterToPoleEmploiBoolean"
          :click="addCurrentSituationRegisterToPoleEmploiBoolean"
          boolean
          inline
        />
      </div>
      <div v-if="isJobSeeking && currentSituationRegisterToPoleEmploiBoolean">
        <div class="field">
          <h3 class="title is-5">Depuis le :</h3>
          <div class="control">
            <date-picker :value="currentSituationRegisterToPoleEmploiDate" @input="addCurrentSituationRegisterToPoleEmploiDate" :format="this.dateFormat"></date-picker>
          </div>
        </div>
        <div class="field">
          <h3 class="title is-5">Je suis indemnisé :</h3>
          <RadioList
            key="poleEmploiSubQuestion"
            :value="currentSituationCompensationType"
            :click="addCurrentSituationCompensationType"
            :options="compensationType"
          />
        </div>
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
import moment from 'moment';
import helpLoaderMixin from '~/mixins/helpLoader.js';
import withDatePickerMixin from '~/mixins/withDatePicker.js';

import RadioList from "~/components/RadioList.vue";

import possibleAnswers from '~/contents/data/currentSituation';

export default {
  mixins: [
    helpLoaderMixin,
    withDatePickerMixin,
  ],
  components: {
    RadioList,
  },
  computed: {
    currentSituationStatus() {
      return this.$store.state.identity.currentSituation.status;
    },
    isWorking() {
      return this.currentSituationStatus === 'working'
    },
    isJobSeeking() {
      return this.currentSituationStatus === 'jobseeking'
    },
    currentSituationEmploymentType() {
      return this.$store.state.identity.currentSituation.employmentType;
    },
    currentSituationRegisterToPoleEmploiBoolean() {
      if (
        this.$store.state.identity.currentSituation.registerToPoleEmploi === null ||
        this.$store.state.identity.currentSituation.registerToPoleEmploi === undefined)
        return null;
      return !!this.$store.state.identity.currentSituation.registerToPoleEmploi;
    },
    currentSituationRegisterToPoleEmploiDate() {
      if (typeof(this.$store.state.identity.currentSituation.registerToPoleEmploi) === 'string') {
        return new Date(this.$store.state.identity.currentSituation.registerToPoleEmploi);
      }
    },
    currentSituationCompensationType() {
      return this.$store.state.identity.currentSituation.compensationType;
    },
    isHandicapped() {
      return this.$store.state.identity.isHandicapped;
    },
  },
  data() {
    const {
      status,
      employmentType,
      compensationType,
    } = possibleAnswers;
    return {
      status,
      employmentType,
      compensationType,
    }
  },
  methods: {
    addCurrentSituationStatus: function(value) {
      this.$store.commit('identity/addCurrentSituationStatus', value)
    },
    addCurrentSituationEmploymentType: function(value) {
      this.$store.commit('identity/addCurrentSituationEmploymentType', value)
    },
    addCurrentSituationRegisterToPoleEmploiBoolean: function(value) {
      if (value !== this.currentSituationRegisterToPoleEmploiBoolean) {
        this.$store.commit('identity/addCurrentSituationRegisterToPoleEmploi', value)
      }
    },
    addCurrentSituationRegisterToPoleEmploiDate: function(value) {
      // console.log(moment(value).format(this.storeFormat))
      this.$store.commit('identity/addCurrentSituationRegisterToPoleEmploi', moment(value).format(this.storeFormat))
    },
    addCurrentSituationCompensationType: function(value) {
      this.$store.commit('identity/addCurrentSituationCompensationType', value)
    },
    addIsHandicapped: function(value) {
      this.$store.commit('identity/addIsHandicapped', value)
    },
  },
}
</script>