<template>
  <nuxt-child />
</template>
<script type="text/javascript">
  import {endsWithNoCase} from 'avril/js/utils/string';

  export default {
    asyncData: async function(context) {
      const isExperienceIndex = endsWithNoCase(context.route.fullPath, '/experiences');
      if (!isExperienceIndex && !context.store.getters['experiences/current']) {
        context.redirect('../experiences');
      }
      return {};
    },
  }
</script>