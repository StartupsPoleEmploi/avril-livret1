<template>

  <div class="container">

    <div class="columns">
      <div class="column is-8 is-offset-2">

        <div class="avril-layout">

          <div class="avril-content">

            <div class="avril-form-help-container">

              <nuxt />

            </div>

          </div>

        </div>

      </div>
    </div>

  </div>

</div>
</template>

<script>
import _ from 'lodash';
import Actions from '~/components/Actions.vue';
import Tabs from '~/components/Tabs.vue';
import StepperExperience from '~/components/stepper-experience.vue';
import StepperFormation from '~/components/stepper-formation.vue';
import StepperIdentite from '~/components/stepper-identite.vue';

import ArrowLeft from '@/assets/svgs/keyboard-arrow-left.svg';
import ArrowRight from '@/assets/svgs/keyboard-arrow-right.svg';

  export default {
    components: {
      Actions,
      Tabs,
      StepperExperience,
      StepperFormation,
      StepperIdentite,
      ArrowLeft,
      ArrowRight,
    },
    computed: {
      heures () {
        return this.$store.state.experiences.heures
      },
      remplissage () {
        let counter = 0;

        let sections = 6;
        let valeurs = this.$store.state.experiences;

        if( valeurs.heures > 1607 ) counter++;
        if( valeurs.titres.length != 0 ) counter++;
        if( valeurs.formationsContinues.length != 0 ) counter++;

        if( !_.isEmpty( valeurs.formations.classe ) ) counter++;
        if( !_.isEmpty( valeurs.formations.diplome ) ) counter++;
        if( !_.isEmpty( valeurs.formations.certification ) ) counter++;

        let sut = ( counter / sections ) * 100;
        this.$store.commit('application/addRemplissage', sut);
        return sut;
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
