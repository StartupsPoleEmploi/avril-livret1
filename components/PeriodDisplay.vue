<template>
  <div>
    Du {{ formatDate(period.start) }}
    <span v-if="period.end">au {{ formatDate(period.end) }}</span>
    <span v-else>à aujourd'hui</span> :
    <span v-if="isMoreThanOneWeek"><strong>{{Math.round(period.weekHours)}}h/semaine</strong> soit</span>
    <strong>{{ periodTotalHours }} heures</strong> en cumulé
    <span v-if="!isMoreThanOneWeek">{{period.weekHours >= fullTimeWeekHours ? 'à temps plein' : 'à temps partiel'}}</span>
  </div>
</template>

<script type="text/javascript">
  import {
    formatDate,
    isMoreThanOneWeek,
    periodTotalHours,
  } from 'avril/js/utils/time.js';

  export default {
    computed: {
      isMoreThanOneWeek(){
        return isMoreThanOneWeek(this.period);
      },
      periodTotalHours(){
        return periodTotalHours(this.period);
      },
    },
    data() {
      return {
        fullTimeWeekHours: 35,
      };
    },
    methods: {
      formatDate,
    },
    props: ['period'],
  }
</script>