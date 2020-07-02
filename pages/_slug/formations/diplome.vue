<template>
  <div>
    <div class="field">
      <h3 class="title is-5">
        Quel est le diplôme le plus élevé que vous avez obtenu en France ?
      </h3>
      <RadioList
        :value="degree"
        :options="possibleAnswers"
        to="/formations/rncp"
        :click="addDegree"
      />
    </div>
    <ContinueOrFillLater to="/formations/rncp" :value="degree" />
  </div>
</template>

<script>
  import RadioList from '~/components/RadioList.vue';
  import possibleAnswers from '~/contents/data/degree';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';

  export default {
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      degree() {
        return this.$store.state.education.degree;
      }
    },
    data() {
      return {
        possibleAnswers,
      };
    },
    methods: {
      addDegree(value) {
        this.$store.commit('education/addDegree', value);
      }
    }
  };
</script>
