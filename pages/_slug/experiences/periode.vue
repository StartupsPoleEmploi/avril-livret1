<template>
  <div>
    <div class="field">
      <h3 v-if="periods && periods.length > 0" class="title is-5">
        Périodes d'activité
        <span v-if="experience && experience.role && experience.companyName">en tant que {{experience.role}} chez {{experience.companyName}}</span>
        <span v-else>pour cette experience</span> :
      </h3>
      <div class="box is-equal-height" v-for="period in periods">
        <p>
          <PeriodDisplay :period="period" />
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
    </div>
    <div class="field has-text-centered" v-if="periods.length > 0">
      <button class="button is-wrapped is-default" @click="toggleShowNewPeriod">
        <span v-if="showNewPeriod">Annuler nouvelle période</span>
        <span v-else>
          Ajouter une autre période
          <span v-if="experience && experience.role && experience.companyName">en tant que {{experience.role}} chez {{experience.companyName}}</span>
        </span>
      </button>
    </div>
    <div v-if="showNewPeriod || periods.length === 0">
      <h3 class="title is-5">
        <span v-if="experience && experience.role && experience.companyName">{{experience.role}} chez {{experience.companyName}}</span>
        <span v-else>Cette experience</span>
        est mon poste actuel ?
      </h3>
      <div class="field">
        <RadioList
          :value="isCurrentJob"
          :click="setIsCurrentJob"
          boolean
          inline
        />
      </div>
      <div class="field box natural-language">
        <p class="title is-5">
          {{isCurrentJob ? 'Je travaille depuis le' : 'J\'y ai travaillé du'}}
          <DatePicker
            class="input is-date"
            ref="periodStart"
            v-model="periodStart"
            :disabled-date="maxDate"
            placeholder="date"
          />
          <span v-if="!isCurrentJob">
            au
            <DatePicker
              class="input is-date"
              ref="periodEnd"
              v-model="periodEnd"
              :disabled-date="minDate"
              placeholder="date"
            />
          </span>
          <span v-if="showWeekHours">
            à <input ref="periodWeekHours" class="input is-heure" type="number" v-model="periodWeekHours" placeholder="35" min="0"> heures par semaine.
          </span>
          <span v-else>
            pour un total de <input ref="periodTotalHours" class="input is-heure is-total" type="number" v-model="periodTotalHours" placeholder="1607" min="0"> heures.
          </span>
        </p>
        <p class="has-text-right">
        </p>
        <div class="buttons" style="justify-content: space-between; align-items: bottom;">
          <button class="button is-text is-small" @click="toggleWeekHours">
            <span v-if="showWeekHours">Je saisis le nombre d'heure total</span>
            <span v-else>Je saisis mes heures par semaine</span>
          </button>
          <button class="button is-primary" @click="addPeriod">
            + Ajouter cette période
          </button>
        </div>
      </div>
    </div>
    <ContinueOrFillLater to="/experiences" :value="periods.length" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import RadioList from '~/components/RadioList.vue';
  import PeriodDisplay from '~/components/PeriodDisplay.vue';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import DatePicker from 'avril/js/components/DatePicker.vue';

  import {
    parseISODate,
    formatISODate,
  } from 'avril/js/utils/time.js';

  export default {
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('../experiences');
      }
    },
    data() {
      return {
        periodStart: '',
        periodEnd: '',
        periodWeekHours: '',
        periodTotalHours: '',
        isCurrentJob: null,
        showWeekHours: true,
        showNewPeriod: false,
      }
    },
    components: {
      ContinueOrFillLater,
      PeriodDisplay,
      RadioList,
      DatePicker,
    },
    computed: {
      experience() {
        return this.$store.getters['experiences/current'];
      },
      periods() {
        return get(this.$store.getters['experiences/current'], 'periods', []);
      },
    },
    methods: {
      parseISODate,
      addPeriod() {
        if (!this.$refs.periodStart.value) return this.$refs.periodStart.$el.focus();
        if (!this.isCurrentJob && !this.$refs.periodEnd.value) return this.$refs.periodEnd.$el.focus();
        if (this.showWeekHours) {
          if (!this.$refs.periodWeekHours.value) return this.$refs.periodWeekHours.focus();
        } else {
          if (!this.$refs.periodTotalHours.value) return this.$refs.periodTotalHours.focus();
        }

        const period = {
          startDate: formatISODate(this.periodStart),
          endDate: this.isCurrentJob ? null : formatISODate(this.periodEnd),
          weekHoursDuration: this.periodWeekHours ? parseInt(this.periodWeekHours) : null,
          totalHours: this.periodTotalHours ? parseInt(this.periodTotalHours) : null,
        };
        this.$store.dispatch('experiences/addPeriod', period);

        this.periodStart = '';
        this.periodEnd = '';
        this.periodWeekHours = '';
        this.periodTotalHours = '';
        this.isCurrentJob = false;
        this.showNewPeriod = false;


      },
      editPeriod(periodId) {
        const period = this.$store.getters['experiences/current'].periods.find(p => p.uuid == periodId)
        this.periodStart = parseISODate(period.startDate);
        this.periodEnd = parseISODate(period.endDate);
        this.periodWeekHours = period.weekHoursDuration;
        this.periodTotalHours = period.totalHours;
        this.isCurrentJob = !period.endDate;
        this.showWeekHours = !!period.weekHoursDuration;
        this.showNewPeriod = true;
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
      toggleWeekHours() {
        this.showWeekHours = !this.showWeekHours;
        if (this.showWeekHours) {
          this.periodTotalHours = '';
        } else {
          this.periodWeekHours = '';
        }
      },
      toggleShowNewPeriod() {
        this.showNewPeriod = !this.showNewPeriod;
      }
    }
  }
</script>