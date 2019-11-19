<template>

  <div class="form-header">
    <div class="avril-stepper-container">
      <NavBack/>
      <div class="avril-stepper">

        <ul class="steps is-small is-centered has-content-centered">
          <li :class="slugIndex == 1 || slugIndex == 0 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/experiences/fonction" :class="slugIndex == 1 || slugIndex == 0 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/experiences/fonction">Expérience</nuxt-link>
             </div>
           </li>
           <li :class="slugIndex == 2 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/experiences/famille"  :class="slugIndex == 2 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/experiences/famille">Famille pro</nuxt-link>
             </div>
           </li>
           <li :class="slugIndex == 3 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/experiences/status"  :class="slugIndex == 3 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/experiences/status">Statut</nuxt-link>
             </div>
           </li>
           <li :class="slugIndex == 4 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/experiences/periode"  :class="slugIndex == 4 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/experiences/periode">Période</nuxt-link>
             </div>
           </li>
           <li :class="slugIndex == 5 ? 'steps-segment is-active' : 'steps-segment'">
             <nuxt-link to="/experiences/precision"  :class="slugIndex == 5 ? 'steps-marker is-hollow' : 'steps-marker'"></nuxt-link>
             <div class="steps-content is-divider-content">
               <nuxt-link class="is-size-6" to="/experiences/precision">Activités</nuxt-link>
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
