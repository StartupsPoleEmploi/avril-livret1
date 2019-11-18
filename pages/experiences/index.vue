<template>
  <div class="form experience-index">

    <div class="form-fields">

        <h1 class="title is-3">Mes expériences professionnelles</h1>

        <nuxt-link to="experiences/fonction" :class="heures<1607 ? 'button is-dark' : 'button'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>add</title>
              <path d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"></path>
          </svg>&nbsp; Ajouter une expérience
        </nuxt-link>
        <span class="avril-ou" v-if="heures >= 1607">&nbsp;ou&nbsp;</span>
        <nuxt-link v-if="heures >= 1607" :event="heures < 1607 ? '' : 'click'" to="/formations" class="is-ok button is-dark">
          Avancer vers mes formations
        </nuxt-link>

        <div class="columns is-multiline">
          <div v-for="experience in experiences" class="column is-half">
            <div class="box is-equal-height">
              <h3 class="title is-4">{{ experience.role }}</h3>
              <h3 class="title is-6">{{ experience.duration }} heures</h3>
              <p>{{ experience.companyName }}</p>
              <span>{{ experience.period }}</span>
              <a href="#">éditer</a>
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="avril__box__experience is-equal-height">
            </div>
          </div>
        </div>

      </div>


      <div class="form-help">
        <h3 class="title is-5">Besoin d'aide ?</h3>
        <div class="form-help-content">
          Dans cette rubrique, vous allez nous indiquer vos expériences.<br/> Nous parlons là des expériences qui ont un rapport avec le diplôme que vous souhaitez obtenir.<br/> Si vous n'êtes pas sûr(e) de vous, notez toutes vos expériences, nous ferons le tri !<br/> Retenez que ce qui est important c'est de totaliser au moins 1 an d'expérience à temps plein en lien avec le diplôme souhaité.
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
      return this.$store.state.experiences
    },
    heures () {
      return 0;
      // return this.$store.state.experiences
    },
    pourcentage () {
      return 0;
      // if( (this.$store.state.experiences*100)/1607 > 100 )
      //   return 100
      // else
      //   return (this.$store.state.experiences.heures*100)/1607
    }
  },

  methods: {
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
.experience-index{
  padding-top: 5rem;
}
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
