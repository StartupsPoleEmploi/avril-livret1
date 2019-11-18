<template>

  <div class="container">

    <div class="avril-layout">

      <!-- Tabs -->
      <div class="avril-navigation">
        <div class="navigation-header">
          <div class="avril-back">
            <a :href="phoenixUrl">
              <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24">
                <title>arrow-left-1</title>
                <path d="M4.5,12a2.3,2.3,0,0,1,.78-1.729L16.432.46a1.847,1.847,0,0,1,2.439,2.773L9.119,11.812a.25.25,0,0,0,0,.376l9.752,8.579a1.847,1.847,0,1,1-2.439,2.773L5.284,13.732A2.31,2.31,0,0,1,4.5,12Z"></path>
              </svg> retour
            </a>
          </div>
        </div>
        <div class="navigation-tabs">
          <h3 class="navigation-title title is-4">Dossier de recevabilité</h3>
          <h4 class="navigation-subtitle title is-5">CAP - Accompagnant éducatif - Petite enfance</h4>
          <div class="navigation-progressbar progress__bar">
            <div class="progress__bar--suivi" :style="`width:${progress}%`"></div>
          </div>
          <div class="">
            {{Math.round(progress)}}% complété
          </div>

          <Tabs></Tabs>

          <div class="avril--actions">
            <div class="control">
              <nuxt-link to="/recapitulatif" class="is-ok button" :class="slugIndex == 15 ? 'is-dark' : 'is-default'">
                Enregistrer mon livret de recevabilité
              </nuxt-link>
            </div>
          </div>

        </div>
      </div>


      <div class="avril-content">
        <div class="avril-form-help-container">
          <component :is="currentStepper" />
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import Tabs from '~/components/Tabs.vue';
import StepperExperiences from '~/components/StepperExperiences.vue';
import StepperFormations from '~/components/StepperFormations.vue';
import StepperIdentite from '~/components/StepperIdentite.vue';

import ArrowLeft from '@/assets/svgs/keyboard-arrow-left.svg';
import ArrowRight from '@/assets/svgs/keyboard-arrow-right.svg';

  export default {
    components: {
      Tabs,
      StepperExperiences,
      StepperFormations,
      StepperIdentite,
      ArrowLeft,
      ArrowRight,
    },
    computed: {
      phoenixUrl() {
        return `${process.env.phoenixUrl}/candidatures/actuelle`;
      },
      currentStepper () {
        const currentTab = this.$store.state.currentTab;
        return `Stepper${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}`;
      },
      heures () {
        return this.$store.state.experiences.heures
      },
      progress () {
        // let counter = 0;

        // let sections = 6;
        // let totalHours = this.$store.state.experiences.reduce(0, (total, experience) => {
        //   return total + (experience.hours || 0);
        // });

        // if( valeurs.heures > 1607 ) counter++;
        // if( valeurs.titres.length != 0 ) counter++;
        // if( valeurs.formationsContinues.length != 0 ) counter++;

        // if( !_.isEmpty( valeurs.formations.classe ) ) counter++;
        // if( !_.isEmpty( valeurs.formations.diplome ) ) counter++;
        // if( !_.isEmpty( valeurs.formations.certification ) ) counter++;

        // let sut = ( counter / sections ) * 100;
        // this.$store.commit('updateProgress', sut);
        return 0;
      },
    },
    methods: {

    },
    mounted() {
      this.slugIndex = _.findIndex(this.cerfa, ['slug', this.$route.name])
    },
    watch: {
      $route (to, from) {
        this.slugIndex = _.findIndex(this.cerfa, ['slug', this.$route.name])
        if(this.slugIndex != this.way[0]) this.displayBack = true;
        if(this.slugIndex == this.way[this.way.length-1]) this.displayNext = false;
      }
    },
    afterCreated() {

    },
    data: () => ({
      current: 0,
      slugIndex: 0,
      way: [6,7,11,12,0,1,2,3,4,5, 13, 14, 15],
      displayBack: false,
      displayNext: true,
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
      // 13
      {
        slug: 'identite',
        title: "Mes formations",
      },
      {
        slug: 'identite-naissance',
        title: "Mes formations",
      },
      {
        slug: 'identite-identite',
        title: "Mes formations",
      },
    ],
    })
  }
</script>

<style>
html {
  font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
