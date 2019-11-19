<template>

  <div class="form">

    <div class="form-fields">

      <h3 class="title is-5">Quel était votre statut au moment où vous avez exercé ce métier ?</h3>

      <nuxt-link v-on:click.native="addContractType('A')" to="periode" class="box">
        <input type="radio" name="answer"> &nbsp;Salarié
      </nuxt-link>
      <nuxt-link v-on:click.native="addContractType('E')" to="periode" class="box">
        <input type="radio" name="answer"> &nbsp;Contrat Unique d'Insertion (CUI, CAE...)
      </nuxt-link>
      <nuxt-link v-on:click.native="addContractType('D')" to="periode" class="box">
        <input type="radio" name="answer"> &nbsp;Travailleur indépendant, artisan, profession libérale
      </nuxt-link>
      <nuxt-link v-on:click.native="addContractType('B')" to="periode" class="box">
        <input type="radio" name="answer"> &nbsp;En contrat de professionnalisation
      </nuxt-link>
      <nuxt-link v-on:click.native="addContractType('C')" to="periode" class="box">
        <input type="radio" name="answer"> &nbsp;En contrat d’apprentissage
      </nuxt-link>
      <!-- <nuxt-link v-on:click.native="addContractType('F')" to="periode" class="box">
        <input type="radio" name="answer"> &nbsp;Autre
      </nuxt-link> -->
      <div class="select">
        <input type="radio" name="answer"> &nbsp;
        <select>
          <option>Autres</option>
          <option>Contrat aidé</option>
          <option>Volontaire</option>
        </select>
      </div>

      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link v-on:click.native="addContractType('H')" to="periode" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
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
    experiencesProgress () {
      return this.$store.getters['experiences/progress'];
    },
  },
  methods: {
    keymonitor: function(event) {
      console.log(event.key);
      if(event.key == "Enter")
      {
        console.log("enter key was pressed!");
        // this.$router.push('/name')
        this.$router.push('name')
      }
    },
    addContractType (e) {
      this.$store.commit('experiences/addContractType', e)
    },
  }
}
</script>
