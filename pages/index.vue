<template>
  <p>Coucou</p>
</template>

<script type="text/javascript">
export default {
  created() {
    this.$router.push({
        path: '/formations'
    })
  },
}
</script>