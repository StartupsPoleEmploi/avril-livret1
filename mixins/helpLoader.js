import Help from '~/components/Help.vue';

export default {
  asyncData: async ({route}) => {
    const post = await import(`~/contents/help${route.path}${route.path.split('/').length == 2 ? '/index' : ''}.md`);
    return {
      help: post.default,
    };
  },
  components: {
    Help,
  },
}