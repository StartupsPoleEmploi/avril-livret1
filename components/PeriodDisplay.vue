<template>
  <div>
    Du {{ startDate }}
    <span v-if="period.endDate">au {{ endDate }}</span>
    <span v-else>à aujourd'hui</span> :
    <span v-if="isMoreThanOneWeek && period.weekHoursDuration"><strong>{{Math.round(period.weekHoursDuration)}}h/semaine</strong> soit</span>
    <strong>{{ periodTotalHours }} heures</strong> en cumulé
    <span v-if="!isMoreThanOneWeek && period.weekHoursDuration">{{period.weekHoursDuration >= fullTimeWeekHours ? 'à temps plein' : 'à temps partiel'}}</span>
  </div>
</template>

<script type="text/javascript">
  import {
    formatDate,
    isMoreThanOneWeek,
    periodTotalHours,
    parseISODate,
    formatISODate,
  } from 'avril/js/utils/time.js';

  export default {
    computed: {
      startDate() {
        return formatDate(parseISODate(this.period.startDate))
      },
      endDate() {
        return formatDate(parseISODate(this.period.endDate))
      },
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
      formatISODate,
      parseISODate,
    },
    props: ['period'],
  }
</script>