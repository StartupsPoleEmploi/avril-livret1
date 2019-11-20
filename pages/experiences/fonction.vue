<template>

  <div class="form">
    <div class="form-fields">
      <div class="field">
        <label class="label">Emploi ou fonction occupée</label>
        <div class="control">
          <input :value="role" ref="role" class="input" type="text" placeholder="Exemple : Boulanger Pâtissier" @input="addRole">
        </div>
      </div>

      <div class="field">
        <label class="label">Nom de l'entreprise</label>
        <div class="control">
          <input :value="companyName" class="input" type="text" placeholder="Exemple : Crêche p'tit loup" @input="addCompanyName">
        </div>
      </div>

      <div class="field">
        <label class="label">Adresse de l'entreprise ou association</label>
        <div class="control">
          <input :value="companyAddress" class="input" v-on:keyup="next" type="text" placeholder="Exemple : 40 boulevard machin, 56000 Lorient" @input="addCompanyAddress">
          <!-- <div class="push-enter is-pulled-right">
            Appuyez sur <strong>Entrée</strong>
          </div> -->
        </div>
      </div>

      <div class="form-field-action field">
        <div class="control">
          <nuxt-link to="famille" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="famille" class="is-ok button is-dark is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>

    </div>
    <Help :content="help" />
  </div>


</template>

<script>
import helpLoaderMixin from '~/mixins/helpLoader.js';

export default {
  mixins: [helpLoaderMixin],
  computed: {
    role() {
      return this.$store.getters['experiences/current'].role;
    },
    companyName() {
      return this.$store.getters['experiences/current'].companyName;
    },
    companyAddress() {
      return this.$store.getters['experiences/current'].companyAddress;
    },
  },
  created() {
    if (!this.$store.getters['experiences/current']) {
      this.$store.dispatch('experiences/newExperience');
    }
  },
  mounted() {
    this.$refs.role.focus()
  },
  methods: {
    addRole(e) {
      this.$store.commit(
        'experiences/mutateExperience',
        this.$store.getters['experiences/current'],
        {role: e.target.value}
      )
    },
    addCompanyName(e) {
      this.$store.dispatch('experiences/addCompanyName', e.target.value)
    },
    addCompanyAddress(e) {
      this.$store.dispatch('experiences/addCompanyAddress', e.target.value)
    },
    next: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('famille')
      }
    }
  }
}
</script>

<style>
.push-enter{
  margin-top: 5px;
  margin-right: 8px;
}
.avril-field-action{
  margin-top: 2rem;
}
.real-stepper-container{
  visibility: hidden;
}
.real-navigation{
  z-index: -2;
}
</style>
