<template>
  <div>
    <div class="field">
      <label class="label">Emploi ou fonction occupée</label>
      <div class="control">
        <input
          :value="experienceTitle"
          ref="experienceTitle"
          class="input"
          type="text"
          placeholder="Ex: Boulanger Pâtissier"
          @input="addTitle"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Nom de l'entreprise</label>
      <div class="control">
        <input
          :value="companyName"
          class="input"
          type="text"
          placeholder="Ex: Crêche p'tit loup"
          @input="addCompanyName"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Adresse de l'entreprise ou association</label>
      <div class="control">
        <BanGeoInput
          :input="addFullAddress"
          inputclass="input"
          :value="fullAddress"
          placeholder="Ex: 44 rue de dupont, 13000 Marseille"
        />
      </div>
    </div>
    <ContinueOrFillLater to="/experiences/famille" :value="experienceTitle && companyName" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import BanGeoInput from 'avril/js/components/BanGeoInput.vue';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';

  export default {
    components: {
      BanGeoInput,
      ContinueOrFillLater,
    },
    // beforeCreate() {
    //   if (!this.$store.getters['experiences/current']) {
    //     this.$router.push('../experiences');
    //   }
    // },
    computed: {
      experienceTitle() {
        return get(this.$store.getters['experiences/current'], 'title');
      },
      companyName() {
        return get(this.$store.getters['experiences/current'], 'companyName');
      },
      fullAddress() {
        return get(this.$store.getters['experiences/current'], 'fullAddress');
      }
    },
    mounted() {
      if (this.$refs.experienceTitle) {
        this.$refs.experienceTitle.focus();
      }
    },
    methods: {
      addTitle(e) {
        this.$store.dispatch('experiences/addTitle', e.target.value);
      },
      addCompanyName(e) {
        this.$store.dispatch('experiences/addCompanyName', e.target.value);
      },
      addFullAddress(result) {
        this.$store.dispatch('experiences/addFullAddress', result);
      },
    }
  };
</script>