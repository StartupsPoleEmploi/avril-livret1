<template>

  <div class="form">

    <div class="form-fields">
      <div class="field">
        <label class="label">Emploi ou fonction occupée</label>
        <div class="control">
          <input :value="role" ref="avril__emploi" class="input" type="text" placeholder="Exemple : Boulanger Pâtissier" @input="addRole">
        </div>
      </div>

      <div class="field">
        <label class="label">Nom de l'entreprise</label>
        <div class="control">
          <input class="input" type="text" placeholder="Exemple : Crêche p'tit loup" @input="addCompanyName">
        </div>
      </div>

      <div class="field">
        <label class="label">Adresse de l'entreprise ou association</label>
        <div class="control">
          <input class="input" v-on:keyup="next" type="text" placeholder="Exemple : 40 boulevard machin, 56000 Lorient" @input="addCompanyAddress">
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

    <div class="form-help">
      <h3 class="title is-5">Besoin d'aide ?</h3>
      <div class="form-help-content content">
        <p>
          Précisez les métiers ou fonctions que vous avez occupés (salariés, bénévoles...).
        </p>
        <p>
          Nous parlons des métiers ou fonctions qui ont un lien avec le diplôme que vous souhaitez obtenir.
        </p>
        <p>
          Vous pouvez reprendre ce qui est noté dans votre CV ou votre bulletin de salaire.
        </p>
        <p>
          Vous devez renseigner les coordonnées des entreprises telles qu'elles apparaissent sur les justificatifs que vous fournirez (certificats de travail, fiche de paye, etc)..
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
    role () {
      let size = this.$store.state.experiences.length - 1
      if(this.$store.state.experiences.length)
        return this.$store.state.experiences[ size ].role
    },
  },
  created() {
  },
  mounted() {
    this.$store.commit('experiences/new')
    this.$refs.avril__emploi.focus()
  },
  methods: {
    addRole (e) {
      this.$store.commit('experiences/addRole', e.target.value)
    },
    addCompanyName (e) {
      this.$store.commit('experiences/addCompanyName', e.target.value)
    },
    addCompanyAddress (e) {
      this.$store.commit('experiences/addCompanyAddress', e.target.value)
    },
    gotoNext: function() {
      console.log('goto')
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
