<template>
  <div>
    <div class="field">
      <h3 class="title is-5">Quelle classe avez vous suivi en dernier ?</h3>
      <RadioList
        :value="grade"
        :options="possibleAnswers"
        to="/formations/diplome"
        :click="addGrade"
      />
    </div>
    <ContinueOrFillLater to="/formations/diplome" :value="grade" />
  </div>
</template>

<script>
  import RadioList from '~/components/RadioList.vue';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import possibleAnswers from '~/contents/data/grade';

  export default {
    components: {
      ContinueOrFillLater,
      RadioList,
    },
    computed: {
      grade() {
        return this.$store.state.education.grade;
      }
    },
    data() {
      return {
        possibleAnswers,
      };
    },
    methods: {
      addGrade(e) {
        this.$store.commit('education/addGrade', e);
      }
    }
  };
</script>
