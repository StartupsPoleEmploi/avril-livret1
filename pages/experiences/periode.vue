<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">
        <span v-if="experience.role && experience.companyName">{{experience.role}} chez {{experience.companyName}}</span>
        <span v-else>Cette experience</span>
        est mon poste actuel ?
      </h3>
      <div>
        <div class="field">
          <RadioList
            :value="isCurrentJob"
            :click="setIsCurrentJob"
            boolean
            inline
          />
        </div>
        <div class="field box natural-language">
          <client-only placeholder="Chargement du calendrier ...">
            <p class="title is-5">
              {{isCurrentJob ? 'Je travaille depuis le' : 'J\'y ai travaillé du'}}
              <date-picker ref="periodStart" v-model="periodStart" :format="datePickerFormat" :disabled-date="maxDate" :placeholder="defaultPlaceholder"/>
              <span v-if="!isCurrentJob">
                au <date-picker ref="periodEnd" v-model="periodEnd" :disabled-date="minDate" :format="datePickerFormat" :placeholder="defaultPlaceholder" />
              </span>
              à <input ref="periodWeekHours" class="input heure" type="number" v-model="periodWeekHours" placeholder="35" min="0"> heures par semaine.
            </p>
          </client-only>
        <div class="">
          <button class="button is-dark" @click="addPeriod" style="margin-top:1rem">
            + Ajouter cette période
          </button>
        </div>
        </div>
      </div>
      <h3 v-if="periods.length > 0" class="title is-5">
        Périodes d'activité
        <span v-if="experience.role && experience.companyName">en tant que {{experience.role}} chez {{experience.companyName}}</span>
        <span v-else>pour cette experience</span> :
      </h3>
      <div class="box is-equal-height" v-for="period in periods">
        <p>
          Du {{ formatDate(period.start) }}
          <span v-if="period.end">au {{ formatDate(period.end) }}</span>
          <span v-else>à aujourd'hui</span> : <strong>{{ periodTotalHours(period) }} heures</strong>
        </p>
        <div class="columns">
          <div class="column">
            <button @click="editPeriod(period.uuid)" class="button is-text">Modifier cette période</button>
          </div>
          <div class="column">
            <button @click="removePeriod(period.uuid)" class="button is-text">Supprimer cette période</button>
          </div>
        </div>
      </div>

      <div class="field" style="margin-top: 2rem;">
        <div class="control">
          <nuxt-link to="/experiences" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="/experiences" class="is-ok button is-default is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>

    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import {periodTotalHours, formatDate} from '../../utils/time.js';

import helpLoaderMixin from '~/mixins/helpLoader.js';
import withDatePickerMixin from '~/mixins/withDatePicker.js';

import RadioList from "~/components/RadioList.vue";

export default {
  mixins: [
    helpLoaderMixin,
    withDatePickerMixin,
  ],
  beforeCreate() {
    if (!this.$store.getters['experiences/current']) {
      this.$router.push('/experiences');
    }
  },
  data() {
    return {
      periodStart: '',
      periodEnd: '',
      periodWeekHours: '',
      isCurrentJob: null,
    }
  },
  components: {
    RadioList,
  },
  computed: {
    experience() {
      return this.$store.getters['experiences/current'];
    },
    periods() {
      const currentExperience = this.$store.getters['experiences/current'];
      return currentExperience && currentExperience.periods;
    },
  },
  methods: {
    formatDate,
    addPeriod() {
      if (!this.$refs.periodStart.value) return this.$refs.periodStart.focus();
      if (!this.isCurrentJob && !this.$refs.periodEnd.value) return this.$refs.periodEnd.focus();
      if (!this.$refs.periodWeekHours.value) return this.$refs.periodWeekHours.focus();

      const period = {
        start: this.periodStart,
        end: this.isCurrentJob ? null : this.periodEnd,
        weekHours: parseInt(this.periodWeekHours),
      };
      this.$store.dispatch('experiences/addPeriod', period);

      this.periodStart = '';
      this.periodEnd = '';
      this.periodWeekHours = '';
      this.isCurrentJob = false;
    },
    editPeriod(periodId) {
      const period = this.$store.getters['experiences/current'].periods.find(p => p.uuid == periodId)
      this.periodStart = period.start;
      this.periodEnd = period.end;
      this.periodWeekHours = period.weekHours;
      this.isCurrentJob = !period.end;
      this.$store.dispatch('experiences/removePeriod', periodId);
    },
    setIsCurrentJob(value) {
      this.isCurrentJob = value;
    },
    removePeriod(periodId) {
      if(window.confirm('Je confirme vouloir supprimer cette période ?')){
        this.$store.dispatch('experiences/removePeriod', periodId);
      }
    },
    maxDate(date) {
      return date > new Date() || (this.periodEnd && (date > this.periodEnd));
    },
    minDate(date) {
      return date > new Date() || (this.periodStart && (date < this.periodStart));
    },
    periodTotalHours,
  }
}
</script>