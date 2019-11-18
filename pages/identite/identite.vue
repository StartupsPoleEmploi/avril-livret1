<template>
  <div class="form is-horizontal">

    <div class="form-fields fields">

      <div class="field">
        <div class="control">
          <div class="columns">
            <div class="column">
              <label class="label">Mon nom</label>
              <input :value="lastName" ref="avril__focus" class="input" type="text" placeholder="Votre nom" @input="addLastName">
            </div>
            <div class="column">
              <label class="label">Mes prénoms</label>
              <input class="input" type="text" placeholder="Vos prénoms" @input="addFirstNames">
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Mon email</label>
        <div class="control">
          <input :value="email" class="input" type="email" placeholder="Exemple : avril@pole-emploi.fr" @input="addEmail">
        </div>
      </div>

      <div class="field">
        <label class="label">Mon numéro de téléphone à domicile</label>
        <div class="control">
          <input :value="homePhoneNumber" class="input" type="text" placeholder="Exemple : 01 99 88 77 66" @input="addHomePhoneNumber">
        </div>
      </div>

      <div class="field">
        <label class="label">Mon numéro de téléphone mobile</label>
        <div class="control">
          <input :value="cellPhoneNumber" class="input" type="text" placeholder="Exemple : 01 99 88 77 66" @input="addCellPhoneNumber">
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

      <!-- <div class="form-field-action field">
        <div class="control">
          <nuxt-link to="identite/naissance" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="identite/naissance" class="is-ok button is-dark is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div> -->

    </div>


      <div class="form-help">
        <h3 class="title is-5">Besoin d'aide ?</h3>
        <div class="form-help-content">
          Ces informations vont permettre aux différents intervenants VAE de vous contacter. <br/>Elles vont aussi servir à vous inscrire au diplôme. Il faut donc nous donner les informations telles qu'elles apparaissent sur vos justificatifs d'identité.<br/>Pour l'adresse, il faut indiquer votre adesse actuelle.
        </div>
        <p style="margin-top:1rem">
          <a href="#" class="is-text">J'ai besoin de plus d'aide</a>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  computed: {
    experiences () {
      return this.$store.state.experiences.experiences
    },
    heures () {
      return this.$store.state.experiences.heures
    },
    pourcentage () {
      if( (this.$store.state.experiences.heures*100)/1607 > 100 )
        return 100
      else
        return (this.$store.state.experiences.heures*100)/1607
    },
    lastName () {
      return this.$store.state.identity.lastName
    },
    usageName () {
      return this.$store.state.identity.usageName
    },
    email () {
      return this.$store.state.identity.email
    },
    homePhoneNumber () {
      return this.$store.state.identity.homePhoneNumber
    },
    cellPhoneNumber () {
      return this.$store.state.identity.cellPhoneNumber
    },
  },

  created() {
    // console.log('accueil created')
  },

  mounted() {
    this.$refs.avril__focus.focus()
  },
  methods: {
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('name')
      }
    },
    addLastName: function(e) {
      this.$store.commit('identity/addLastName', e.target.value)
    },
    addFirstNames: function(e) {
      this.$store.commit('identity/addFirstNames', e.target.value)
    },
    addUsageName: function(e) {
      this.$store.commit('identity/addUsageName', e.target.value)
    },
    addEmail: function(e) {
      this.$store.commit('identity/addEmail', e.target.value)
    },
    addHomePhoneNumber: function(e) {
      this.$store.commit('identity/addHomePhoneNumber', e.target.value)
    },
    addCellPhoneNumber: function(e) {
      this.$store.commit('identity/addCellPhoneNumber', e.target.value)
    },
  },
  watch: {
    $route (to, from) {
      this.slugIndex = _.findIndex(this.cerfa, ['slug', this.$route.name])
    }
  },
  data: () => ({
    current: 0,
    slugIndex: 0,
    cerfa:[{
      slug: 'experiences',
      title: "Mes expériences",
    },
    {
      slug: 'experiences-fonction',
      title: "Mes formations",
    },
    {
      slug: 'experiences-famille',
      title: "Mes formations",
    },
    {
      slug: 'experiences-status',
      title: "Mes formations",
    },
    {
      slug: 'experiences-periode',
      title: "Mes formations",
    },
    {
      slug: 'experiences-precision',
      title: "Mes formations",
    },
    {
      slug: 'formations',
      title: "Mes formations",
    },
    {
      slug: 'formations-diplome',
      title: "Mes formations",
    },
    {
      slug: 'formations-autre',
      title: "Mes formations",
    },
    {
      slug: 'formations-comparatibilite',
      title: "Mes formations",
    },
    {
      slug: 'formations-certification',
      title: "Mes formations",
    },
    {
      slug: 'formations-rncp',
      title: "Mes formations",
    },
    {
      slug: 'formations-formations',
      title: "Mes formations",
    },
  ],
  })
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
