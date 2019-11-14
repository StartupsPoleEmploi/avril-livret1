<template>

  <div class="form">

    <div class="form-fields">
      <div class="field">
        <label class="label">Emploi ou fonction occupée</label>
        <div class="control">
          <input :value="fonction" ref="avril__emploi" class="input" type="text" placeholder="Exemple : Boulanger Pâtissier" @input="addFonction">
        </div>
      </div>

      <div class="field">
        <label class="label">Nom de l'entreprise</label>
        <div class="control">
          <input class="input" type="text" placeholder="Exemple : Crêche p'tit loup" @input="addEntreprise">
        </div>
      </div>

      <div class="field">
        <label class="label">Adresse de l'entreprise ou association</label>
        <div class="control">
          <input class="input" v-on:keyup="next" type="text" placeholder="Exemple : 40 boulevard machin, 56000 Lorient" @input="addAdresseEntreprise">
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
      <div class="form-help-content">
         Précisez les métiers ou fonctions que vous avez occupés (salariés, bénévoles...).<br/> Nous parlons des métiers ou fonctions qui ont un lien avec le diplôme que vous souhaitez obtenir.<br/> Vous pouvez reprendre ce qui est noté dans votre CV ou votre bulletin de salaire.<br/> Vous devez renseigner les coordonnées des entreprises telles qu'elles apparaissent sur les justificatifs que vous fournirez (certificats de travail, fiche de paye, etc)..
      </div>
      <p style="margin-top:1rem">
        <a href="#" class="is-text">J'ai besoin de plus d'aide</a>
      </p>
    </div>
  </div>


</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  layout: 'experience',
  components: {
  },
  computed: {
    fonction () {
      let size = this.$store.state.experiences.length - 1
      if(this.$store.state.experiences.length)
        return this.$store.state.experiences[ size ].experiences.fonction
    },
    heures () {
      return this.$store.state.experiences.heures
    },
    pourcentage () {
      if( (this.$store.state.experiences.heures*100)/1607 > 100 )
        return 100
      else
        return (this.$store.state.experiences.heures*100)/1607
    }
  },

  created() {
  },

  mounted() {
    this.$store.commit('application/disableFormationStepper')
    this.$store.commit('application/disableIdentiteStepper')
    this.$store.commit('application/changeTab', 0)

    this.$store.commit('experiences/new')
    this.$store.commit('application/enableExperienceStepper')

    this.$refs.avril__emploi.focus()
  },
  methods: {
    // ...mapActions([
    //   'setNewExperience',
    // ]),
    addFonction (e) {
      this.$store.commit('experiences/addFonction', e.target.value)
    },
    addEntreprise (e) {
      this.$store.commit('experiences/addEntreprise', e.target.value)
    },
    addAdresseEntreprise (e) {
      this.$store.commit('experiences/addAdresseEntreprise', e.target.value)
    },
    gotoNext: function() {
      // this.addFonctionEtEntreprise('test')
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
