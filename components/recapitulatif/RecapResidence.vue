<template>
  <span class="recap-cell cell-residence">
    <p v-if="identite.address">J'habite {{addressLabelify(identite.address)}}.</p>
    <p v-else><strong>Je n'ai pas encore renseigné mon adresse.</strong></p>
  </span>
</template>

<script>
import {addressLabelify} from '~/utils/geo.js';

export default {
  computed: {
    identite () {
      return this.$store.state.identity
    },
  },
  methods: {
    addressLabelify,
  }

}

</script>