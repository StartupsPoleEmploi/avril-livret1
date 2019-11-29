<template>
  <div class="form">
    <div class="form-fields">

      <div class="field natural-language">
        <client-only placeholder="Chargement ...">
          <span class="title is-5">
            J'ai travaillé du <date-picker ref="periodStart" v-model="periodStart" :disabled-date="maxDate" :format="dateFormat" :placeholder="placeholder"></date-picker> au
            <date-picker ref="periodEnd" v-model="periodEnd" :disabled-date="minDate" :format="dateFormat" :placeholder="placeholder"></date-picker> à <input ref="periodWeekHours" class="input heure" type="number" v-model="periodWeekHours" placeholder="35" min="0"> heures par semaine.
          </span>
        </client-only>
        <div class="">
          <a class="button is-dark" @click="addPeriod" style="margin-top:1rem">
            + Ajouter cette période
          </a>
        </div>
      </div>

      <div class="columns is-multiline">
        <div v-for="period in periods" class="column is-half">
          <div class="box is-equal-height">
            <button @click="removePeriod(period.uuid)" class="delete" style="margin-left: auto; margin-bottom: 0.5rem;"></button>
            <p class="title is-3">{{ periodTotalHours(period) }} heures</p>
            <h3 class="title is-6">Du {{ formatDate(period.start) }}<br /> au {{ formatDate(period.end) }}</h3>
            <button @click="editPeriod(period.uuid)" class="button is-text">Modifier</button>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <nuxt-link to="precision" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="precision" class="is-ok button is-default is-pulled-right">
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

import {periodTotalHours} from '../../utils/time.js';

import helpLoaderMixin from '~/mixins/helpLoader.js';
import withDateDisplayMixin from '~/mixins/withDateDisplay.js';
import withDatePickerMixin from '~/mixins/withDatePicker.js';

export default {
  mixins: [
    helpLoaderMixin,
    withDateDisplayMixin,
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
    }
  },
  computed: {
    periods () {
      const currentExperience = this.$store.getters['experiences/current'];
      return currentExperience && currentExperience.periods;
    },
  },
  methods: {
    addPeriod() {
      if (!this.$refs.periodStart.value) return this.$refs.periodStart.focus();
      if (!this.$refs.periodEnd.value) return this.$refs.periodEnd.focus();
      if (!this.$refs.periodWeekHours.value) return this.$refs.periodWeekHours.focus();

      const period = {
        start: this.periodStart,
        end: this.periodEnd,
        weekHours: parseInt(this.periodWeekHours),
      };
      this.$store.dispatch('experiences/addPeriod', period);

      this.periodStart = '';
      this.periodEnd = '';
      this.periodWeekHours = '';
    },
    editPeriod(periodId) {
      const period = this.$store.getters['experiences/current'].periods.find(p => p.uuid == periodId)
      this.periodStart = period.start;
      this.periodEnd = period.end;
      this.periodWeekHours = period.weekHours;
      this.$store.dispatch('experiences/removePeriod', periodId);
    },
    removePeriod(periodId) {
      this.$store.dispatch('experiences/removePeriod', periodId);
    },
    maxDate(date) {
      return date > new Date() || (this.periodEnd && (date > this.periodEnd));
    },
    minDate(date) {
      return date > new Date() || (this.periodStart && (date < this.periodStart));
    },
    periodTotalHours(period) {
      return periodTotalHours(period);
    },
  }
}
</script>

<style>
.mx-datepicker-range {
  width: 100%;
}
</style>
