<template>

  <div class="form-header" v-if="currentTab == 'identite'">

    <div class="avril-stepper-container">
      <NavBack/>
      <div class="avril-stepper">
        <ul class="steps is-small is-centered has-content-centered">
          <li :class="slugIndex == 13 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/identite/residence" :class="slugIndex == 13 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/identite/residence">Mon lieu de résidence</nuxt-link>
             </div>
           </li>
           <li :class="slugIndex == 14 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/identite/naissance"  :class="slugIndex == 14 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/identite/naissance">Ma naissance</nuxt-link>
             </div>
           </li>
           <li :class="slugIndex == 15 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/identite/identite"  :class="slugIndex == 15 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/identite/identite">Mon identité</nuxt-link>
             </div>
           </li>
         </ul>
      </div>

    </div>
  </div>

</template>
<script>
import _ from 'lodash';
import NavBack from '~/components/NavBack.vue';

export default {
  components: {
    NavBack
  },
  computed: {
    displayIdentiteStepper () {
      return this.$store.state.application.displayIdentiteStepper
    },
    currentTab () {
      return this.$store.state.currentTab;
    },
  },
  watch: {
    $route (to, from) {
      this.slugIndex = _.findIndex(this.cerfa, ['slug', this.$route.name])
    }
  },
  data: () => ({
    current: 0,
    slugIndex: 13,
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
