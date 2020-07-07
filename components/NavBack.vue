<template>
  <div class="nav-back">
    <nuxt-link :to="toBack" class="button is-default" :disabled="!toBack">
      <ArrowLeft />
    </nuxt-link>
    <nuxt-link :to="toNext" class="button is-default" :disabled="!toNext">
      <ArrowRight />
    </nuxt-link>
  </div>
</template>

<script>
  import ArrowLeft from 'avril/images/icons/arrow-left.svg';
  import ArrowRight from 'avril/images/icons/arrow-right.svg';
  import NuxtLink from '~/components/NuxtLink.vue';
  import { endsWithNoCase } from 'avril/js/utils/string';

  export default {
    components: {
      ArrowLeft,
      ArrowRight,
      NuxtLink,
    },
    computed: {
      toBack: function() {
        if (this.$store.getters.isTheBeginning) return;
        const paths = this.$store.getters.flatPaths;
        return paths[paths.findIndex(p => endsWithNoCase(this.$store.state.currentPath, p)) - 1];
      },
      toNext: function() {
        if (this.$store.getters.isTheEnd) return;
        const paths = this.$store.getters.flatPaths;
        return paths[paths.findIndex(p => endsWithNoCase(this.$store.state.currentPath, p)) + 1];
      },
    },
  }
</script>
