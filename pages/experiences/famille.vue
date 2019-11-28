<template>
  <div class="form">

    <div class="form-fields">

      <h3 class="title is-5">Quelle est la famille professionnelle de votre métier ?</h3>
      <RadioList :value="category" :options="possibleAnswers" to="/experiences/statut" :click="addCategory" />

      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="is-ok button is-text is-pulled-left">
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
      this.$router.push('/experiences');
    }
  },
  components: {
    RadioList,
  },
  computed: {
    category() {
      return this.$store.getters['experiences/current'].category
    }
  },
  data() {
    return {
      possibleAnswers: [{
        label: 'Administration publique, professions juridiques, armée et police',
        value: 'administration',
      },{
        label: 'Agriculture, marine, pêche',
        value: 'agriculture',
      },{
        label: 'Artisanat',
        value: 'artisanat',
      },{
        label: 'Banque et assurance',
        value: 'banque',
      },{
        label: 'Bâtiment, travaux publics',
        value: 'batiment',
      },{
        label: 'Commerce',
        value: 'commerce',
      },{
        label: 'Communication, information, art et spectacle',
        value: 'communication',
      },{
        label: 'Electricité, électronique',
        value: 'electricite',
      },{
        label: 'Enseignement, formation',
        value: 'enseignement',
      },{
        label: 'Études et recherche',
        value: 'etudes',
      },{
        label: 'Gestion, administration des entreprises',
        value: 'gestion',
      },{
        label: 'Industries de process',
        value: 'industries',
      },{
        label: 'Informatique et télécommunications',
        value: 'informatique',
      },{
        label: 'Ingénieurs et cadres de l\'industrie',
        value: 'ingenieurs',
      },{
        label: 'Hôtellerie, restauration, alimentation',
        value: 'hotellerie',
      },{
        label: 'Maintenance',
        value: 'maintenance',
      },{
        label: 'Matériaux souples, bois, industries graphiques',
        value: 'materiaux',
      },{
        label: 'Mécanique, travail des métaux',
        value: 'mecanique',
      },{
        label: 'Politique, religion',
        value: 'politique',
      },{
        label: 'Santé, action sociale, culturelle et sportive',
        value: 'sante',
      },{
        label: 'Services aux particuliers et aux collectivités',
        value: 'services',
      },{
        label: 'Transports, logistique et tourisme',
        value: 'transports',
      }]
    }
  },
  methods: {
    addCategory(category) {
      this.$store.dispatch('experiences/addCategory', category)
    },
  }
}
</script>