<template>
  <div v-if="savingState" class="saving notification" :class="`is-${savingStateClass}`">
    <p v-if="isWarning">Non connecté : les données ne sont pas enregistrées </p>
    <p v-if="isPending">Enregistrement en cours ... </p>
    <p v-if="isSuccess">Enregistrement réussi :) </p>
    <p v-if="isError">Impossible d'enregistrer :( </p>
  </div>
</template>

<script>
import {
  NO_SAVING,
  SAVING_PENDING,
  SAVING_SUCCESS,
  SAVING_ERROR,
} from '~/constants/index';

export default {
  computed: {
    savingState() {
      return this.$store.state.savingState;
    },
    savingStateClass() {
      switch (this.$store.state.savingState) {
        case NO_SAVING:
          return 'warning';
        case SAVING_PENDING:
          return 'info';
        case SAVING_SUCCESS:
          return 'success';
        case SAVING_ERROR:
          return 'danger';
      }
      return this.$store.state.savingState;
    },
    isPending() {
      return this.$store.state.savingState === SAVING_PENDING
    },
    isSuccess() {
      return this.$store.state.savingState === SAVING_SUCCESS
    },
    isError() {
      return this.$store.state.savingState === SAVING_ERROR
    },
    isWarning() {
      return this.$store.state.savingState === NO_SAVING
    },
  },
}
</script>

<style>
.saving {
  position: fixed;
  top: 2rem;
  right: 2rem;
}

</style>
