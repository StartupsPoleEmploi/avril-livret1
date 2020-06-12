<template>
  <div class="nav-back">
    <button @click="back" class="button is-default" :class="!displayBack ? 'is-static' : ''">
      <ArrowLeft />
    </button>
    <button @click="next" class="button is-default" :class="!displayNext ? 'is-static' : ''">
      <ArrowRight />
    </button>
  </div>
</template>

<script>
  import ArrowLeft from 'avril/images/icons/arrow-left.svg';
  import ArrowRight from 'avril/images/icons/arrow-right.svg';

  export default {
    components: {
      ArrowLeft,
      ArrowRight,
    },
    computed: {
      displayBack() {
        return !this.$store.getters.isTheBeginning;
      },
      displayNext() {
        return !this.$store.getters.isTheEnd;
      }
    },
    methods: {
      back: function(e) {
        if (this.$store.getters.isTheBeginning) return;
        const paths = this.$store.getters.flatPaths;
        this.$router.push({
          path: paths[paths.findIndex(p => p === this.$store.state.currentPath) - 1]
        });
      },
      next: function(e) {
        if (this.$store.getters.isTheEnd) return;
        const paths = this.$store.getters.flatPaths;
        this.$router.push({
          path: paths[paths.findIndex(p => p === this.$store.state.currentPath) + 1]
        });
      }
    },
  }
</script>

<style scoped lang="scss">
  // .nav-back {
  //   margin-right: 1rem;
  // }
</style>
