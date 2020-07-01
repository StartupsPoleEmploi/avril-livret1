<template>
  <div>
    <div class="field">
      <h3 class="title is-5">
        Quelle est la famille professionnelle de votre métier ?
      </h3>
      <RadioList
        :value="category"
        :options="possibleAnswers"
        to="/experiences/statut"
        :click="addCategory"
      />
    </div>
    <ContinueOrFillLater to="/experiences/statut" :value="category" />
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
        this.$router.push('/experiences');
      }
    },
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      category() {
        return get(this.$store.getters['experiences/current'], 'category');
      }
    },
    data() {
      return {
        possibleAnswers,
      };
    },
    methods: {
      addCategory(category) {
        this.$store.dispatch('experiences/addCategory', category);
      }
    }
  };
</script>
