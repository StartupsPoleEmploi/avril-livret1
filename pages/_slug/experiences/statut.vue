<template>
  <div>
    <div class="field">
      <h3 class="title is-5">
        Quel était votre statut au moment où vous avez exercé ce métier ?
      </h3>
      <RadioList
        :value="contractType"
        :options="possibleAnswers"
        to="/experiences/precision"
        :click="addContractType"
      />
    </div>
    <ContinueOrFillLater to="/experiences/precision" :value="contractType" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import RadioList from '~/components/RadioList.vue';
  import possibleAnswers from '~/contents/data/experienceStatuses';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';

  export default {
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('/experiences');
      }
    },
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      contractType() {
        return get(this.$store.getters['experiences/current'], 'contractType');
      }
    },
    data() {
      return {
        possibleAnswers
      }
    },
    methods: {
      addContractType(e) {
        this.$store.dispatch('experiences/addContractType', e);
      }
    }
  };
</script>
