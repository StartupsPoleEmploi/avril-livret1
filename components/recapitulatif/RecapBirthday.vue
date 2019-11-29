<template>
  <span class="recap-cell cell-birthday">
    <p v-if="identite.birthday">Je suis né<span v-if="identite.sex!='m'">e</span> le {{formatDate(identite.birthday)}} à {{identite.birthPlace}}</p>
    <p v-else>Je n'ai pas encore renseigné ma date de naissance.</p>
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

