<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">Quel était votre statut au moment où vous avez exercé ce métier ?</h3>
      <RadioList :value="contractType" :options="possibleAnswers" :extras="otherAnswers" to="/experiences/periode" :click="addContractType" />
      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link v-on:click.native="addContractType('H')" to="periode" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
        </div>
      </div>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import RadioList from '~/components/RadioList.vue';
import helpLoaderMixin from '~/mixins/helpLoader.js';

export default {
  mixins: [helpLoaderMixin],
  beforeCreate() {
    if (!this.$store.getters['experiences/current']) {
      this.$store.dispatch('experiences/newExperience');
    }
  },
  components: {
    RadioList,
  },
  computed: {
    contractType() {
      return this.$store.getters['experiences/current'].contractType;
    },
  },
  data() {
    return {
      possibleAnswers: [{
        label: 'Salarié',
        value: 'salarie',
      }, {
        label: 'Contrat Unique d\'Insertion (CUI, CAE...)',
        value: 'insertion',
      }, {
        label: 'Travailleur indépendant, artisan, profession libérale',
        value: 'independant',
      }, {
        label: 'En contrat de professionnalisation',
        value: 'professionnalisation',
      }, {
        label: 'En contrat d’apprentissage',
        value: 'apprentissage',
      }],
      otherAnswers: [{
        label: 'Contrat aidé',
        value: 'aide',
      }, {
        label: 'Volontaire',
        value: 'volontaire',
      }]
    }
  },
  methods: {
    keymonitor: function(event) {
      console.log(event.key);
      if(event.key == "Enter")
      {
        console.log("enter key was pressed!");
        // this.$router.push('/name')
        this.$router.push('name')
      }
    },
    addContractType (e) {
      this.$store.dispatch('experiences/addContractType', e)
    },
  }
}
</script>
