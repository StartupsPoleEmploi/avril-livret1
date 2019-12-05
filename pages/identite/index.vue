<template>
  <div class="form">
    <div class="form-fields">
      <div class="field">
        <label class="label">L'adresse de votre lieu de résidence</label>
        <div class="control">
          <GeoInput :input="addAddress" ref="avril__focus" :value="address" placeholder="Exemple : 44 rue de dupont, 13000 Marseille" />
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
import {addressLabelify} from '~/utils/geo.js';
import GeoInput from '~/components/GeoInput';

export default {
  mixins: [helpLoaderMixin],
  components: {
    GeoInput,
  },
  computed: {
    address() {
      return this.$store.state.identity.address;
    },
  },
  mounted() {
    if (!this.address) {
      this.$refs.avril__focus.$el.getElementsByTagName('input')[0].focus()
    }
  },
  methods: {
    addAddress: function(result) {
      this.$store.commit('identity/addAddress', result)
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
