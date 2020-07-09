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
    isMoreThanOneWeek,
    periodTotalHours,
    parseAndFormat,
  } from 'avril/js/utils/time.js';

  export default {
    computed: {
      startDate() {
        return parseAndFormat(this.period.startDate)
      },
      endDate() {
        return parseAndFormat(this.period.endDate)
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
    props: ['period'],
  }
</script>