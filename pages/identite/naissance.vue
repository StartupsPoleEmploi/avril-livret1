<template>
  <div class="form">

    <div class="form-fields">

      <div class="field">
        <label class="label">Lieu de naissance</label>
        <div class="control">
          <input :value="lieu" ref="avril__focus" class="input" type="text" placeholder="Exemple : Marseille, France" @input="addBirth">
        </div>
      </div>

      <!-- Date de naissance -->
      <div class="field">
        <label class="label">Date de naissance</label>
        <div class="control">
          <date-picker v-model="premierePeriode" lang="fr" format="DD/MM/YYYY" confirm></date-picker>
        </div>
      </div>

      <div class="form-field-action field">
        <div class="control">
          <nuxt-link to="identite" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="identite" class="is-ok button is-dark is-pulled-right">
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
import DatePicker from 'vue2-datepicker';
import moment from 'moment';

// import Logo from '~/components/Logo.vue'
// const ioHook = require('iohook');
export default {
  layout: 'experience',
  components: {
    DatePicker
  },
  computed: {
    experiences () {
      return this.$store.state.experiences.experiences
    },
    lieu () {
      return this.$store.state.identity.birth.city
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
  },
  methods: {
    addBirth: function(){
      // pareil, splitter le lieu grâce à Google
      // addDateNaissance (state, value) {
      //   state.birth.date = value
      // },
      // addDepartementNaissance (state, value) {
      //   state.birth.departement = value
      // },
      // addCommuneNaissance (state, value) {
      //   state.birth.city = value
      // },
      // addNationaliteNaissance (state, value) {
      //   state.birth.nationalite = value
      // },
      console.log('test')
    },
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('name')
      }
    }
  },
  watch: {
    $route (to, from) {
      this.slugIndex = _.findIndex(this.cerfa, ['slug', this.$route.name])
    }
  },
  data: () => ({
    lang: {
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      pickers: ['7 jours suivants', '30 jours suivants', '7 jours précédents', '30 jours précédents'],
      placeholder: {
        date: 'Sélectionnez une date',
        dateRange: 'Sélectionnez une période'
      }
    },
    time3: '',
    premierePeriode: '',
    secondePeriode: '',
    heurePeriode: '',
    semaine: 46,
    hours: 35,
    selectedYear: 46,
    selectedSemaines: 46,
    selectedHours: 35,
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
