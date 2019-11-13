<template>
  <div class="field has-addons is-pulled-left">
    <p class="control">
      <a href="#" @click="back" :class="!displayBack ? 'button lefty is-static' : 'button lefty'">
        <ArrowLeft />
      </a>
    </p>
    <p class="control">
      <a href="#" @click="next" :class="!displayNext ? 'button righty is-static' : 'button righty'">
        <ArrowRight />
      </a>
    </p>
  </div>
</template>

<script>
import _ from 'lodash';

import ArrowLeft from '@/assets/svgs/keyboard-arrow-left.svg';
import ArrowRight from '@/assets/svgs/keyboard-arrow-right.svg';
export default {
  components: {
    ArrowLeft,
    ArrowRight,
  },
  computed: {
  },
  methods: {
    back: function (e) {
      if(this.slugIndex == this.way[0]){
        this.displayBack = false;
        return false;
      }
      let previous = this.way[(_.indexOf(this.way, this.slugIndex)-1)];
      let url = this.cerfa[previous].slug.replace('-', '/');
      this.$router.push({
          path: '/' + url
      });
    },
    next: function (e) {
      if(_.indexOf(this.way, this.slugIndex) == this.way.length - 1){
        this.displayNext = false;
        return false;
      }
      let next = this.way[(_.indexOf(this.way, this.slugIndex)+1)];
      let url = this.cerfa[next].slug.replace('-', '/');
      this.$router.push({
          path: '/' + url
      });
    }
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

</style>
