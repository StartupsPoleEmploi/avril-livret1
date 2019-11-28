<template>
  <span class="recap-cell cell-birthday">
    <p>Je suis né<span v-if="identite.sex!='m'">e</span> le {{formatDate(identite.birth.date)}}</p>
    <p>à {{identite.birth.county}}, {{identite.birth.city}}, {{identite.birth.country}}</p>
  </span>
</template>

<script>
import withDateDisplayMixin from '~/mixins/withDateDisplay.js';

export default {
  mixins: [
    withDateDisplayMixin
  ],
  computed: {
    identite () {
      return this.$store.state.identity
    },
  },
}
</script>

