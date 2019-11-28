<template>
  <span class="recap-cell cell-birthday">
    <p>Je suis né<span v-if="identite.sex!='m'">e</span> le {{formatDate(identite.birthday)}} à {{identite.birthPlace}}</p>
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

