<template>
  <div>
    <div class="field">
      <h3 class="title is-5">
        Quel était votre statut au moment où vous avez exercé ce métier ?
      </h3>
      <RadioList
        :value="employmentType"
        :options="possibleAnswers"
        to="/experiences/precision"
        :click="addEmploymentType"
      />
    </div>
    <ContinueOrFillLater to="/experiences/precision" :value="employmentType" />
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
        this.$router.push('../experiences');
      }
    },
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      employmentType() {
        return get(this.$store.getters['experiences/current'], 'employmentType');
      }
    },
    data() {
      return {
        possibleAnswers
      }
    },
    methods: {
      addEmploymentType(e) {
        this.$store.dispatch('experiences/addEmploymentType', e);
      }
    }
  };
</script>
