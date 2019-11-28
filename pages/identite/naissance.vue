<template>
  <div class="form">
    <div class="form-fields">

      <div class="field">
        <label class="label">Lieu de naissance</label>
        <div class="control">
          <input :value="birthPlace" ref="avril__focus" class="input" type="text" placeholder="Exemple : Marseille, France" @input="addBirthPlace"/>
        </div>
      </div>

      <div class="field">
        <label class="label">Date de naissance</label>
        <div class="control">
          <date-picker :value="birthday" @input="addBirthday" lang="fr" format="DD/MM/YYYY"></date-picker>
        </div>
      </div>

      <div class="form-field-action field">
        <div class="control">
          <nuxt-link to="identite" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="identite" class="is-ok button is-dark is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>

    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

import helpLoaderMixin from '~/mixins/helpLoader.js';
import withDatePickerMixin from '~/mixins/withDatePicker.js';

export default {
  mixins: [
    helpLoaderMixin,
    withDatePickerMixin,
  ],
  computed: {
    birthPlace() {
      return this.$store.state.identity.birthPlace
    },
    birthday() {
      return this.$store.state.identity.birthday
    }
  },
  mounted() {
    this.$refs.avril__focus.focus()
  },
  methods: {
    addBirthPlace: function(e) {
      this.$store.commit('identity/addBirthPlace', e.target.value)

      // pareil, splitter le lieu grâce à Google
      // addDateNaissance (state, value) {
      //   state.birth.date = value
      // },
      // addDepartementNaissance (state, value) {
      //   state.birth.departement = value
      // },
      // addCommuneNaissance (state, value) {
      //   state.birth.city = value
      // },
      // addNationaliteNaissance (state, value) {
      //   state.birth.nationalite = value
      // },
    },
    addBirthday: function(date) {
      this.$store.commit('identity/addBirthday', date);
    },
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('name')
      }
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
