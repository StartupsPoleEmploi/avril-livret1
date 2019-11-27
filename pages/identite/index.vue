<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <label class="label">L'adresse de votre lieu de résidence</label>
        <div class="control">
          <input :value="addressStreetName" ref="avril__focus" class="input" type="text" placeholder="Exemple : 44 rue de dupont, 13000 Marseille" @input="addAddress">
        </div>
      </div>

      <div class="form-field-action field">
        <div class="control">
          <nuxt-link to="identite/naissance" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="identite/naissance" class="is-ok button is-dark is-pulled-right">
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
    addressStreetName () {
      return this.$store.state.identity.address.streetName
    },
  },
  mounted() {
    this.$refs.avril__focus.focus()
  },
  methods: {
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('/identite/naissance')
      }
    },
    addAddress: function(e) {
      this.$store.commit('identity/addAddressStreetName', e.target.value)
      // ici il faut splitter l'adresse Google :
      // this.$store.commit('identity/addAddressStreetType', 'Avenue')
      // this.$store.commit('identity/addAddressStreetNumber', '45')
      // this.$store.commit('identity/addAddressCity', 'Marseille')
      // this.$store.commit('identity/addAddressPostalCode', '13000')
      // this.$store.commit('identity/addAddressCountry', 'France')
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
