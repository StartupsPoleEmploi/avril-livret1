<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <h3 class="title is-5">
          Quel est le diplôme le plus élevé que vous avez obtenu en France ?
        </h3>
        <RadioList
          :value="latestDegree"
          :options="possibleAnswers"
          to="/formations/rncp"
          :click="addLatestDegree"
        />
      </div>
      <ContinueOrFillLater to="/formations/rncp" :value="latestDegree" />
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
  import RadioList from 'avril/js/components/RadioList.vue';
  import helpLoaderMixin from '~/mixins/helpLoader.js';
  import possibleAnswers from '~/contents/data/latestDegree';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';

  export default {
    mixins: [helpLoaderMixin],
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      latestDegree() {
        return this.$store.state.education.latestDegree;
      }
    },
    data() {
      return {
        possibleAnswers,
      };
    },
    methods: {
      addLatestDegree(e) {
        this.$store.commit('education/addLatestDegree', e);
      }
    }
  };
</script>
