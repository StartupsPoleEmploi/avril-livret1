<script type="text/javascript">
  const errorObject = {
    statusCode: 404,
    message: 'Vous êtes perdus !'
  }
  const message = 'Vous êtes perdu.';
  export default {
    render() {
      return this.$nuxt.error(errorObject)
    },
    asyncData: async function({error}) {
      error(errorObject)
    },
  }
</script>