<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">
        Quelle est la famille professionnelle de votre métier ?
      </h3>
      <RadioList
        :value="category"
        :options="possibleAnswers"
        to="/experiences/statut"
        :click="addCategory"
      />

      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link to="statut" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link v-if="category" to="statut" class="is-ok button is-dark is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>
    </div>

    <Help :content="help" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import RadioList from 'avril/js/components/RadioList.vue';
  import helpLoaderMixin from '~/mixins/helpLoader.js';
  import possibleAnswers from '~/contents/data/experienceCategories';

  export default {
    mixins: [helpLoaderMixin],
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('/experiences');
      }
    },
    components: {
      RadioList
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
