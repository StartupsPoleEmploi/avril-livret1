<template>
  <div>
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
</template>

<script>
  import RadioList from 'avril/js/components/RadioList.vue';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import possibleAnswers from '~/contents/data/latestCourseLevel';

  export default {
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
