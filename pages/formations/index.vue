<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <h3 class="title is-5">Quelle classe avez vous suivi en dernier ?</h3>
        <RadioList
          :value="latestCourseLevel"
          :options="possibleAnswers"
          to="/formations/diplome"
          :click="addLatestCourseLevel"
        />
      </div>
      <ContinueOrFillLater to="/formations/diplome" :value="latestCourseLevel" />
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
  import RadioList from 'avril/js/components/RadioList.vue';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import helpLoaderMixin from '~/mixins/helpLoader.js';
  import possibleAnswers from '~/contents/data/latestCourseLevel';

  export default {
    mixins: [helpLoaderMixin],
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      latestCourseLevel() {
        return this.$store.state.education.latestCourseLevel;
      }
    },
    data() {
      return {
        possibleAnswers,
      };
    },
    methods: {
      addLatestCourseLevel(e) {
        this.$store.commit('education/addLatestCourseLevel', e);
      }
    }
  };
</script>
