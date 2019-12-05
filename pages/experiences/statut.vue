<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">
        Quel était votre statut au moment où vous avez exercé ce métier ?
      </h3>
      <RadioList
        :value="contractType"
        :options="possibleAnswers"
        to="/experiences/precision"
        :click="addContractType"
      />
      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link to="/experiences/precision" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link
            v-if="contractType"
            to="/experiences/precision"
            class="is-ok button is-dark is-pulled-right"
          >
            Continuer
          </nuxt-link>
        </div>
      </div>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import RadioList from "~/components/RadioList.vue";
import helpLoaderMixin from "~/mixins/helpLoader.js";
import possibleAnswers from '~/contents/data/experienceStatuses';

export default {
  mixins: [helpLoaderMixin],
  beforeCreate() {
    if (!this.$store.getters["experiences/current"]) {
      this.$router.push("/experiences");
    }
  },
  components: {
    RadioList
  },
  computed: {
    contractType() {
      if (this.$store.getters["experiences/current"]) {
        return this.$store.getters["experiences/current"].contractType;
      }
    }
  },
  data() {
    return {
      possibleAnswers
    }
  },
  methods: {
    keymonitor: function(event) {
      console.log(event.key);
      if (event.key == "Enter") {
        console.log("enter key was pressed!");
        this.$router.push("name");
      }
    },
    addContractType(e) {
      this.$store.dispatch("experiences/addContractType", e);
    }
  }
};
</script>
