<script type="text/javascript">
  export default {
    render() {
      return this.$router.push({
          path: `/${this.$route.params.slug}/formations`
      })
    },
  }
</script>