<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">
        Quel est le diplôme le plus élevé que vous ayez obtenu en France ?
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
import RadioList from "~/components/RadioList.vue";
import helpLoaderMixin from "~/mixins/helpLoader.js";

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
      possibleAnswers: [
        {
          label: "Aucun diplôme",
          value: "1"
        },
        {
          label: "Certificat d’étude primaire",
          value: "2"
        },
        {
          label:
            "Brevet des collèges (BEPC, DNB), Certificat de Formation Générale (niveau V bis)",
          value: "3"
        },
        {
          label:
            "CAP, BEP ou autre certification de niveau V (niveau CEC3 : 3)",
          value: "4"
        },
        {
          label:
            "Baccalauréat général, technologique, professionnel, ESEU, DAEU, ou autre certification de niveau IV (niveau CEC : 4)",
          value: "5"
        },
        {
          label:
            "DEUG, DUT, DEUST, BTS ou autre certification de niveau III (niveau. CEC : 5)",
          value: "6"
        },
        {
          label:
            "Licence, licence professionnelle, Maîtrise ou autre certification de niveau II (niveau CEC : 6)",
          value: "7"
        },
        {
          label:
            "DESS, Master, titre d’ingénieur ou autre certification de niveau I (niveau CEC : 7)",
          value: "8"
        },
        {
          label: "Doctorat, DEA de niveau I (niveau CEC : 8)",
          value: "9"
        },
        {
          label: "Certificat de qualification professionnelle (CQP)",
          value: "10"
        },
        {
          label:
            "Certificat de qualification professionnelle inter-branches (CQPI)",
          value: "11"
        }
      ]
    };
  },
  methods: {
    addLatestDegree(e) {
      this.$store.commit("education/addLatestDegree", e);
    }
  }
};
</script>
