<template>
  <div class="form">

    <div class="form-fields">

        <h3 class="title is-5">Quelle est la famille professionnelle de votre métier ?</h3>

        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Administration publique, professions juridiques, armée et police
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('A')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Agriculture, marine, pêche
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Artisanat
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Banque et assurance
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('B')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Bâtiment, travaux publics
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Commerce
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Communication, information, art et spectacle
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('C')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Electricité, électronique
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Enseignement, formation
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Études et recherche
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Gestion, administration des entreprises
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('E')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Industries de process
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Informatique et télécommunications
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Ingénieurs et cadres de l'industrie
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Hôtellerie, restauration, alimentation
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('F')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Maintenance
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('G')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Matériaux souples, bois, industries graphiques
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('D')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Mécanique, travail des métaux
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Politique, religion
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Santé, action sociale, culturelle et sportive
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Services aux particuliers et aux collectivités
        </nuxt-link>
        <nuxt-link v-on:click.native="addCategory('H')" to="status" class="box">
          <input type="radio" name="answer"> &nbsp;Transports, logistique et tourisme
        </nuxt-link>


        <div class="form-field-action field" style="margin-top: 20px">
          <div class="control">
            <nuxt-link v-on:click.native="addCategory('H')" to="status" class="is-ok button is-text is-pulled-left">
              Remplir plus tard
            </nuxt-link>
          </div>
        </div>

      </div>


      <div class="form-help">
        <h3 class="title is-5">Besoin d'aide ?</h3>
        <div class="form-help-content content">
          <p>
            Les familles professionnelles sont des ensembles de métiers qui ont des points communs comme des activités ou des compétences.
          </p>
          <p>
            Par exemple, si vous avez été secrétaire, la famille métier sera "gestion, administration des entreprises".
          </p>
          <p>
            Renseignez cette rubrique selon ce qui vous parait juste, il s'agit simplement d'une information pour nous mais pas d'un élément clé pour valider votre demande.
          </p>
        </div>
        <p style="margin-top:1rem">
          <a href="#" class="is-text">J'ai besoin de plus d'aide pour répondre à cette question</a>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    addCategory (e) {
      this.$store.commit('experiences/addCategory', e)
    },
  }
}
</script>

<style>

</style>
