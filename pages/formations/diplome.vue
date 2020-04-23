<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">
        Quel est le diplôme le plus élevé que vous avez obtenu en France ?
      </h3>
      <RadioList
        :value="latestDegree"
        :options="possibleAnswers"
        to="/formations/rncp"
        :click="addLatestDegree"
      />
      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link
            v-on:click.native="addLatestDegree()"
            to="rncp"
            class="is-ok button is-text is-pulled-left"
          >
            Remplir plus tard
          </nuxt-link>
        </div>
      </div>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
  import RadioList from 'avril/js/components/RadioList.vue';
  import helpLoaderMixin from '~/mixins/helpLoader.js';
  import possibleAnswers from '~/contents/data/latestDegree';
  export default {
    mixins: [helpLoaderMixin],
    components: {
      RadioList
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
