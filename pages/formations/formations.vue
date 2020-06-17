<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <h3 class="title is-5">Si vous avez suivi des formations courtes, effectué des stages ou obtenu des habilitations, indiquez les.</h3>
        <ItemInput :items="trainings" :addItem="addTraining" placeholder="Ex: CACES, TOEIC, permis B, FIMO" />
      </div>
      <ItemList :items="trainings" :removeItem="removeTraining" />
      <ContinueOrFillLater to="/experiences" :value="trainings" />
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
  import helpLoaderMixin from '~/mixins/helpLoader.js';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import ItemList from '~/components/ItemList.vue';
  import ItemInput from '~/components/ItemInput.vue';

  export default {
    mixins: [helpLoaderMixin],
    components: {
      ContinueOrFillLater,
      ItemInput,
      ItemList,
    },
    computed: {
      trainings () {
        return this.$store.state.education.trainings;
      },
    },
    methods: {
      addTraining(value) {
        this.$store.commit('education/addTraining', value)
      },
      removeTraining(value) {
        if(window.confirm('Je confirme vouloir supprimer cette formation ?')){
          this.$store.commit('education/removeTraining', value);
        }
      }
    }
  }
</script>

