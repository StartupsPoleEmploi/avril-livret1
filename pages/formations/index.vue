<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">Quelle classe avez vous suivi en dernier ?</h3>
      <RadioList :value="latestCourseLevel" :options="possibleAnswers" to="/formations/diplome" :click="addLatestCourseLevel" />
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import RadioList from '~/components/RadioList.vue';
import helpLoaderMixin from '~/mixins/helpLoader.js';

export default {
  mixins: [helpLoaderMixin],
  components: {
    RadioList,
  },
  computed: {
    latestCourseLevel() {
      return this.$store.state.education.latestCourseLevel;
    },
  },
  data() {
    return {
      possibleAnswers: [{
        label: 'Primaire, 6ème, 5ème, 4ème, 3ème, 1ère année de CAP/BEP',
        value: 'A',
      }, {
        label: '2nde ou 1ère générale, 2ème année de CAP/BEP',
        value: 'B',
      }, {
        label: 'Terminal',
        value: 'C',
      }, {
        label: '1ère ou 2ème année de l\'enseignement supérieur',
        value: 'D',
      }, {
        label: '3ème année de l\'enseignement supérieur',
        value: 'E',
      }, {
        label: '4ème ou 5ème année de l\'enseignement supérieur',
        value: 'F',
      }, {
        label: '6ème année de l\'enseignement supérieur',
        value: 'G',
      }],
    }
  },
  methods: {
    addLatestCourseLevel (e) {
      this.$store.commit('education/addLatestCourseLevel', e)
    },
  },
}
</script>
