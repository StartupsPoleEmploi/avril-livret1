<template>
  <div>
    <div class="field">
      <h3 class="title is-5">
        Quelle est la famille professionnelle de votre métier ?
      </h3>
      <RadioList
        :value="jobIndustry"
        :options="possibleAnswers"
        to="/experiences/statut"
        :click="addJobIndustry"
      />
    </div>
    <ContinueOrFillLater to="/experiences/statut" :value="jobIndustry" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import RadioList from '~/components/RadioList.vue';
  import possibleAnswers from '~/contents/data/experienceCategories';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';

  export default {
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('../experiences');
      }
    },
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      jobIndustry() {
        return get(this.$store.getters['experiences/current'], 'jobIndustry');
      }
    },
    data() {
      return {
        possibleAnswers,
      };
    },
    methods: {
      addJobIndustry(jobIndustry) {
        this.$store.dispatch('experiences/addJobIndustry', jobIndustry);
      }
    }
  };
</script>
