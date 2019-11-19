import Help from '~/components/Help.vue';

export default {
  asyncData: async ({store, route}) => {
    const helpContent = await import(`~/contents/help${route.path}${route.path.split('/').length == 2 ? '/index' : ''}.md`);
    return {
      help: helpContent.default,
    };
  },
  components: {
    Help,
  }
}