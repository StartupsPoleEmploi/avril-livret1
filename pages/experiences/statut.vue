<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">
        Quel était votre statut au moment où vous avez exercé ce métier ?
      </h3>
      <RadioList
        :value="contractType"
        :options="possibleAnswers"
        :extras="otherAnswers"
        to="/experiences/periode"
        :click="addContractType"
      />
      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link
            v-on:click.native="addContractType('H')"
            to="periode"
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
      return this.$store.getters["experiences/current"].contractType;
    }
  },
  data() {
    return {
      possibleAnswers: [
        {
          label: "Salarié",
          value: "1"
        },
        {
          label: "Travailleur indépendant, artisan, profession libérale",
          value: "2"
        },
        {
          label: "En contrat de professionnalisation",
          value: "9"
        },
        {
          label: "En contrat d’apprentissage",
          value: "8"
        }
      ],
      otherAnswers: [
        {
          label: "Contrat Unique d'Insertion (CUI, CAE...)",
          value: "10"
        },
        {
          label: "Volontaire {VIE, VIA...}",
          value: "3"
        },
        {
          label: "Sportif de haut niveau",
          value: "4"
        },
        {
          label: "Personne ayant exercé des responsabilités syndicales",
          value: "6"
        },
        {
          label: "Mandat électoral local ou fonction élective locale",
          value: "7"
        },
        {
          label: "Période d'immersion (PMSMP, EMT)",
          value: "11"
        },
        {
          label: "Préparation opérationnelle à l’emploi (POE)",
          value: "12"
        },
        {
          label: "Période de formation en milieu professionnel (PFMP)",
          value: "13"
        },
        {
          label: "Stage pratique dans le cadre d'une formation",
          value: "14"
        }
      ]
    };
  },
  methods: {
    keymonitor: function(event) {
      console.log(event.key);
      if (event.key == "Enter") {
        console.log("enter key was pressed!");
        // this.$router.push('/name')
        this.$router.push("name");
      }
    },
    addContractType(e) {
      this.$store.dispatch("experiences/addContractType", e);
    }
  }
};
</script>
