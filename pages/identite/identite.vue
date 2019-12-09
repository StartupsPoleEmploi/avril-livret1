<template>
  <div class="form is-horizontal">
    <div class="form-fields fields">
      <div class="field">
        <label class="label">Mes prénoms</label>
        <div class="control">
          <input :value="firstNames" ref="avril__focus" class="input" type="text" placeholder="Vos prénoms" @input="addFirstNames">
        </div>
      </div>
      <div class="field">
        <label class="label">Mon nom</label>
        <div class="control">
        <input :value="lastName" class="input" type="text" placeholder="Votre nom" @input="addLastName">
        </div>
      </div>
      <div class="field">
        <label class="label">Mon email</label>
        <div class="control">
          <input :value="email" class="input" type="email" placeholder="Exemple : avril@pole-emploi.fr" @input="addEmail">
        </div>
      </div>
      <div class="field">
        <label class="label">Nationalité</label>
        <div class="control">
        <GeoInput :input="addNationality" :value="nationality" type="country" placeholder="Exemple : France" />
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
          <PhoneInput :value="cellPhoneNumber" class="input" placeholder="Exemple : 06 12 34 56 78" @input="addCellPhoneNumber" />
        </div>
      </div>

      <div class="field">
        <label class="label">Mon numéro de téléphone à domicile</label>
        <div class="control">
          <PhoneInput :value="homePhoneNumber" class="input" placeholder="Exemple : 01 99 88 77 66" @input="addHomePhoneNumber" />
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
import GeoInput from '~/components/GeoInput';
import PhoneInput from '~/components/PhoneInput';

export default {
  mixins: [helpLoaderMixin],
  components: {
    GeoInput,
    PhoneInput,
  },
  computed: {
    lastName() {
      return this.$store.state.identity.lastName;
    },
    firstNames() {
      return this.$store.state.identity.firstNames;
    },
    usageName() {
      return this.$store.state.identity.usageName;
    },
    email() {
      return this.$store.state.identity.email;
    },
    sex() {
      return this.$store.state.identity.sex;
    },
    homePhoneNumber() {
      return this.$store.state.identity.homePhoneNumber;
    },
    cellPhoneNumber() {
      return this.$store.state.identity.cellPhoneNumber;
    },
    nationality() {
      return this.$store.state.identity.nationality;
    },
  },
  mounted() {
    this.$refs.avril__focus.focus()
  },
  methods: {
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
    addHomePhoneNumber: function(phoneNumber) {
      this.$store.commit('identity/addHomePhoneNumber', phoneNumber)
    },
    addCellPhoneNumber: function(phoneNumber) {
      this.$store.commit('identity/addCellPhoneNumber', phoneNumber)
    },
    addNationality: function(result) {
      this.$store.commit('identity/addNationality', result);
    },
  },
}
</script>
