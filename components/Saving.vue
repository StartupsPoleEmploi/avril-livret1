<template>
  <div v-if="savingState" class="saving notification" :class="`is-${savingStateClass}`">
    <p v-if="isPending">Enregistrement en cours ... </p>
    <p v-if="isSuccess">Enregistrement réussi :) </p>
    <p v-if="isError">Impossible d'enregistrer :( </p>
  </div>
</template>

<script>
import {
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
