<template>
  <span class="recap-cell cell-birthday">
    <p v-if="identite.birthday">Je suis né<span v-if="identite.sex!='m'">e</span> le {{formatDate(identite.birthday)}} à {{addressLabelify(identite.birthPlace)}}</p>
    <p v-else>Je n'ai pas encore renseigné ma date de naissance.</p>
    <p v-if="identite.nationality.country_code">Je suis de nationalité {{identite.nationality.country_code.toUpperCase()}}.</p>
    <p v-else>Je n'ai pas encore renseigné ma nationalité.</p>
  </span>
</template>

<script>
import {addressLabelify} from '~/utils/geo.js';
import {formatDate} from '~/utils/time.js';

export default {
  computed: {
    identite () {
      return this.$store.state.identity
    },
  },
  methods: {
    addressLabelify,
    formatDate,
  }
}
</script>

