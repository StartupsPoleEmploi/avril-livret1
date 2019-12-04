<template>
  <div class="form">
    <div class="form-fields">

      <div class="field">
        <label class="label">Lieu de naissance</label>
        <div class="control">
        <GeoInput :input="addBirthPlace" ref="avril__focus" :value="birthPlace" type="city" placeholder="Exemple : Marseille, France" />
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
import GeoInput from '~/components/GeoInput';

import helpLoaderMixin from '~/mixins/helpLoader.js';
import withDatePickerMixin from '~/mixins/withDatePicker.js';

export default {
  mixins: [
    helpLoaderMixin,
    withDatePickerMixin,
  ],
  components: {
    GeoInput,
  },
  computed: {
    birthPlace() {
      return this.$store.state.identity.birthPlace
    },
    birthday() {
      return this.$store.state.identity.birthday
    }
  },
  mounted() {
    if (!this.birthPlace) {
      this.$refs.avril__focus.$el.getElementsByTagName('input')[0].focus()
    }
  },
  methods: {
    addBirthPlace: function(result) {
      this.$store.commit('identity/addBirthPlace', result)
    },
    addBirthday: function(date) {
      this.$store.commit('identity/addBirthday', date);
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
