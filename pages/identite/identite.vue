<template>
  <div class="form is-horizontal">

    <div class="form-fields fields">

      <div class="field">
        <div class="control">
          <div class="columns">
            <div class="column">
              <label class="label">Mon nom</label>
              <input :value="nom" ref="avril__name" class="input" type="text" placeholder="Votre nom" @input="addNom">
            </div>
            <div class="column">
              <label class="label">Mes prénoms</label>
              <input class="input" type="text" placeholder="Vos prénoms" @input="addPrenoms">
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
          <input :value="telDom" class="input" type="text" placeholder="Exemple : 01 99 88 77 66" @input="addTelDom">
        </div>
      </div>

      <div class="field">
        <label class="label">Mon numéro de téléphone mobile</label>
        <div class="control">
          <input :value="telPortable" class="input" type="text" placeholder="Exemple : 01 99 88 77 66" @input="addTelPortable">
        </div>
      </div>

      <fieldset>
        <br/>
        <div class="field">
          <label class="label">Mon nom d'usage (optionnel)</label>
          <p class="control">
            <input class="input" type="text" placeholder="Votre nom d'usage">
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
        <h3 class="title is-4">Besoin d'aide ?</h3>
        <div class="form-help-content">
          Trouvez toutes les expériences en lien avec le diplôme que vous souhaitez obtenir. Si nécessaire consultez à nouveau le descriptif d'activités du diplôme (faire un lien?). Dans votre CV selectionnez les expériences utiles et reportez-les une par une. Au total il faut avoir travailler au moins l'équivalent d'un an à temps plein dans des activités en lien avec le diplôme.
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
    nom () {
      return this.$store.state.identite.nom
    },
    email () {
      return this.$store.state.identite.email
    },
    telDom () {
      return this.$store.state.identite.telDom
    },
    telPortable () {
      return this.$store.state.identite.telPortable
    },
  },

  created() {
    // console.log('accueil created')
  },

  mounted() {
    this.$refs.avril__name.focus()
  },
  methods: {
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('name')
      }
    },
    addNom: function(e) {
      this.$store.commit('identite/addNom', e.target.value)
    },
    addPrenoms: function(e) {
      this.$store.commit('identite/addPrenoms', e.target.value)
    },
    addEmail: function(e) {
      this.$store.commit('identite/addEmail', e.target.value)
    },
    addTelDom: function(e) {
      this.$store.commit('identite/addTelDom', e.target.value)
    },
    addTelPortable: function(e) {
      this.$store.commit('identite/addTelPortable', e.target.value)
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
