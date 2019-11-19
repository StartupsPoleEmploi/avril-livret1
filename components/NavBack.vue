<template>
  <div class="field has-addons is-pulled-left">
    <p class="control">
      <button @click="back" class="button lefty" :class="!displayBack ? 'is-static' : ''">
        <ArrowLeft />
      </button>
    </p>
    <p class="control">
      <button @click="next" class="button righty" :class="!displayNext ? 'is-static' : ''">
        <ArrowRight />
      </button>
    </p>
  </div>
</template>

<script>
import ArrowLeft from '@/assets/svgs/keyboard-arrow-left.svg';
import ArrowRight from '@/assets/svgs/keyboard-arrow-right.svg';

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

<style>

</style>
