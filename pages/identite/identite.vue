<template>
  <div class="form is-horizontal">
    <div class="form-fields fields">
      <div class="field">
        <div class="control">
          <div class="columns">
            <div class="column">
              <label class="label">Mon nom</label>
              <input :value="lastName" ref="avril__focus" class="input" type="text" placeholder="Votre nom" @input="addLastName">
            </div>
            <div class="column">
              <label class="label">Mes prénoms</label>
              <input class="input" type="text" placeholder="Vos prénoms" @input="addFirstNames">
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Mon email</label>
        <div class="control">
          <input :value="email" class="input" type="email" placeholder="Exemple : avril@pole-emploi.fr" @input="addEmail">
        </div>
      </div>

      <div class="field">
        <label class="label">Genre</label>
        <div class="control">
          <div class="columns">
            <div class="column">
              <a @click="addSex('m')" class="box" :class="sex === 'm' ? 'active' : ''">
                <input type="radio" name="answer" :checked="sex === 'm' ? 'active' : ''"> &nbsp;Masculin
              </a>
            </div>
            <div class="column">
              <a @click="addSex('f')" class="box" :class="sex === 'f' ? 'active' : ''">
                <input type="radio" name="answer" :checked="sex === 'f' ? 'active' : ''"> &nbsp;Féminin
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Mon numéro de téléphone mobile</label>
        <div class="control">
          <input :value="cellPhoneNumber" class="input" type="text" placeholder="Exemple : 01 99 88 77 66" @input="addCellPhoneNumber">
        </div>
      </div>

      <div class="field">
        <label class="label">Mon numéro de téléphone à domicile</label>
        <div class="control">
          <input :value="homePhoneNumber" class="input" type="text" placeholder="Exemple : 01 99 88 77 66" @input="addHomePhoneNumber">
        </div>
      </div>

      <fieldset>
        <br/>
        <div class="field">
          <label class="label">Mon nom d'usage (optionnel)</label>
          <p class="control">
            <input :value="usageName" class="input" type="text" placeholder="Votre nom d'usage" @input="addUsageName">
          </p>
        </div>
      </fieldset>

      <nuxt-link to="/recapitulatif" class="is-ok button is-dark">
        Enregistrer mon dossier de recevabilité
      </nuxt-link>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import helpLoaderMixin from '~/mixins/helpLoader.js';

const formatPhoneNumber = value => {
  return ((value || '').replace(/[^0-9]/g, '').match(/.{1,2}/g) || []).join(' ');
};

export default {
  mixins: [helpLoaderMixin],
  computed: {
    lastName() {
      return this.$store.state.identity.lastName
    },
    usageName() {
      return this.$store.state.identity.usageName
    },
    email() {
      return this.$store.state.identity.email
    },
    sex() {
      return this.$store.state.identity.sex
    },
    homePhoneNumber() {
      return formatPhoneNumber(this.$store.state.identity.homePhoneNumber)
    },
    cellPhoneNumber() {
      return formatPhoneNumber(this.$store.state.identity.cellPhoneNumber)
    },
  },
  created() {
  },
  mounted() {
    this.$refs.avril__focus.focus()
  },
  methods: {
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('name')
      }
    },
    addLastName: function(e) {
      this.$store.commit('identity/addLastName', e.target.value)
    },
    addFirstNames: function(e) {
      this.$store.commit('identity/addFirstNames', e.target.value)
    },
    addSex: function(value) {
      this.$store.commit('identity/addSex', value)
    },
    addUsageName: function(e) {
      this.$store.commit('identity/addUsageName', e.target.value)
    },
    addEmail: function(e) {
      this.$store.commit('identity/addEmail', e.target.value)
    },
    addHomePhoneNumber: function(e) {
      this.$store.commit('identity/addHomePhoneNumber', e.target.value)
    },
    addCellPhoneNumber: function(e) {
      this.$store.commit('identity/addCellPhoneNumber', e.target.value)
    },
  },
}
</script>

<style>
.avril-ou{
  margin-top: 8px;
  display: inline-block;
}
.columns.is-multiline{
  margin-top: 40px;
}
.avril__ajouter__experience {
  display: block
}
.is-equal-height {
   display: flex;
   flex-direction: column;
   height: 100%;
}
</style>
