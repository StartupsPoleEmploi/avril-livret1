<template>
  <div class="form-help">
    <h3 class="title is-5">Besoin d'aide ?</h3>
    <div class="form-help-content content">
      <div v-html="content"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: ['content'],
  }
</script>