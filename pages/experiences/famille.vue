<template>
  <div class="form">

    <div class="form-fields">

      <h3 class="title is-5">Quelle est la famille professionnelle de votre métier ?</h3>

      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Administration publique, professions juridiques, armée et police
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('A')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Agriculture, marine, pêche
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Artisanat
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Banque et assurance
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('B')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Bâtiment, travaux publics
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Commerce
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Communication, information, art et spectacle
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('C')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Electricité, électronique
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Enseignement, formation
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Études et recherche
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Gestion, administration des entreprises
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('E')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Industries de process
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Informatique et télécommunications
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Ingénieurs et cadres de l'industrie
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Hôtellerie, restauration, alimentation
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('F')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Maintenance
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('G')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Matériaux souples, bois, industries graphiques
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('D')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Mécanique, travail des métaux
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Politique, religion
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Santé, action sociale, culturelle et sportive
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Services aux particuliers et aux collectivités
      </nuxt-link>
      <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="box">
        <input type="radio" name="answer"> &nbsp;Transports, logistique et tourisme
      </nuxt-link>


      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link v-on:click.native="addCategory('H')" to="statut" class="is-ok button is-text is-pulled-left">
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
  methods: {
    addCategory (e) {
      this.$store.commit('experiences/addCategory', e)
    },
  }
}
</script>