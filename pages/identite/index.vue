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
// import Logo from '~/components/Logo.vue'
// const ioHook = require('iohook');
export default {
  layout: 'experience',
  components: {
    // Logo
  },
  computed: {
    addressStreetName () {
      return this.$store.state.identity.addressStreetName
    },
    experiences () {
      return this.$store.state.experiences.experiences
    },
    heures () {
      return this.$store.state.experiences.heures
    },
    residence () {
      return this.$store.state.identity.address.streetNumber + ' ' + this.$store.state.identity.address.streetType + ' ' + this.$store.state.identity.address.streetName + ', ' + this.$store.state.identity.address.postalCode + ' ' + this.$store.state.identity.address.city
    },
    pourcentage () {
      if( (this.$store.state.experiences.heures*100)/1607 > 100 )
        return 100
      else
        return (this.$store.state.experiences.heures*100)/1607
    }
  },

  created() {
    // console.log('accueil created')
  },

  mounted() {
    this.$refs.avril__focus.focus()
    this.$store.commit('application/disableExperienceStepper')
    this.$store.commit('application/disableFormationStepper')
    this.$store.commit('application/enableIdentiteStepper')
    this.$store.commit('application/changeTab', 2)
  },
  methods: {
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('name')
      }
    },
    addAddress: function(e) {
      // ici il faut splitter l'adresse Google :
      this.$store.commit('identity/addAddressStreetType', 'Avenue')
      this.$store.commit('identity/addAddressStreetName', 'Dupont')
      this.$store.commit('identity/addAddressStreetNumber', '45')
      this.$store.commit('identity/addAddressCity', 'Marseille')
      this.$store.commit('identity/addAddressPostalCode', '13000')
      this.$store.commit('identity/addAddressCountry', 'France')
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
