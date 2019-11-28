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
          <nuxt-link
            v-on:click.native="addCategory('H')"
            to="statut"
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
    category() {
      return this.$store.getters["experiences/current"].category;
    }
  },
  data() {
    return {
      possibleAnswers: [
        {
          label:
            "Administration publique, professions juridiques, armée et police",
          value: "P"
        },
        {
          label: "Agriculture, marine, pêche",
          value: "A"
        },
        {
          label: "Artisanat",
          value: "K"
        },
        {
          label: "Banque et assurance",
          value: "Q"
        },
        {
          label: "Bâtiment, travaux publics",
          value: "B"
        },
        {
          label: "Commerce",
          value: "R"
        },
        {
          label: "Communication, information, art et spectacle",
          value: "U"
        },
        {
          label: "Electricité, électronique",
          value: "C"
        },
        {
          label: "Enseignement, formation",
          value: "W"
        },
        {
          label: "Études et recherche",
          value: "N"
        },
        {
          label: "Gestion, administration des entreprises",
          value: "L"
        },
        {
          label: "Industries de process",
          value: "E"
        },
        {
          label: "Informatique et télécommunications",
          value: "M"
        },
        {
          label: "Ingénieurs et cadres de l'industrie",
          value: "H"
        },
        {
          label: "Hôtellerie, restauration, alimentation",
          value: "S"
        },
        {
          label: "Maintenance",
          value: "G"
        },
        {
          label: "Matériaux souples, bois, industries graphiques",
          value: "F"
        },
        {
          label: "Mécanique, travail des métaux",
          value: "D"
        },
        {
          label: "Politique, religion",
          value: "X"
        },
        {
          label: "Santé, action sociale, culturelle et sportive",
          value: "V"
        },
        {
          label: "Services aux particuliers et aux collectivités",
          value: "T"
        },
        {
          label: "Transports, logistique et tourisme",
          value: "J"
        }
      ]
    };
  },
  methods: {
    addCategory(category) {
      this.$store.dispatch("experiences/addCategory", category);
    }
  }
};
</script>
