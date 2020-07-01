<template>
  <div>
    <div class="field">
      <label class="label">Emploi ou fonction occupée</label>
      <div class="control">
        <input
          :value="role"
          ref="role"
          class="input"
          type="text"
          placeholder="Ex: Boulanger Pâtissier"
          @input="addRole"
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
        <GeoInput
          :input="addFullAddress"
          :value="fullAddress"
          :credentials="credentials"
          placeholder="Ex: 44 rue de dupont, 13000 Marseille"
        />
      </div>
    </div>
    <ContinueOrFillLater to="/experiences/famille" :value="role && companyName" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import GeoInput from 'avril/js/components/GeoInput.vue';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';

  export default {
    components: {
      GeoInput,
      ContinueOrFillLater,
    },
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('/experiences');
      }
    },
    computed: {
      role() {
        return get(this.$store.getters['experiences/current'], 'role');
      },
      companyName() {
        return get(this.$store.getters['experiences/current'], 'companyName');
      },
      fullAddress() {
        return get(this.$store.getters['experiences/current'], 'fullAddress');
      }
    },
    data: function() {
      return {
        credentials: process.env.algoliaCredentials,
      }
    },
    mounted() {
      if (this.$refs.role) {
        this.$refs.role.focus();
      }
    },
    methods: {
      addRole(e) {
        this.$store.dispatch('experiences/addRole', e.target.value);
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