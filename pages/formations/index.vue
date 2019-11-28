<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">Quelle classe avez vous suivi en dernier ?</h3>
      <RadioList
        :value="latestCourseLevel"
        :options="possibleAnswers"
        to="/formations/diplome"
        :click="addLatestCourseLevel"
      />
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import RadioList from "~/components/RadioList.vue";
import helpLoaderMixin from "~/mixins/helpLoader.js";

export default {
  mixins: [helpLoaderMixin],
  components: {
    RadioList
  },
  computed: {
    latestCourseLevel() {
      return this.$store.state.education.latestCourseLevel;
    }
  },
  data() {
    return {
      possibleAnswers: [
        {
          label: "Primaire, 6ème, 5ème, 4ème, 3ème, 1ère année de CAP/BEP",
          value: "1"
        },
        {
          label: "2nde ou 1ère générale, 2ème année de CAP/BEP",
          value: "2"
        },
        {
          label: "Terminal",
          value: "3"
        },
        {
          label: "1ère ou 2ème année de l'enseignement supérieur",
          value: "4"
        },
        {
          label: "3ème année de l'enseignement supérieur",
          value: "5"
        },
        {
          label: "4ème ou 5ème année de l'enseignement supérieur",
          value: "6"
        },
        {
          label: "6ème année de l'enseignement supérieur",
          value: "7"
        }
      ]
    };
  },
  methods: {
    addLatestCourseLevel(e) {
      this.$store.commit("education/addLatestCourseLevel", e);
    }
  }
};
</script>
